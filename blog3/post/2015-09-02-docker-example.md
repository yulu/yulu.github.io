---
layout: post
title:  "利用Docker开启持续交付之路"
date:   2015-09-02 18:00:00
categories: blog3
---

文／银大伟，《程序员》2014,09

###项目背景

这是一个来自物流行业的案例，由于近几年业务的飞速发展，企业老的门户网站对于日常访问的订单查询还勉强可以支撑，但每天遇到像“双11”这样访问量成倍增长的情况就很难招架了。因此，这家企业希望我们帮他们开发一个全新的门户网站。

新网站采用了静动分离策略，使用Java语言，基于REST架构，并结合CMS系统。简单来说，可以将它看成是时下非常典型的一个基于Java的Web应用，具体包含如下几个部分。

* 基于Jersey动态服务（处理客户端动态请求）
* 二次开发的OpenCMS系统，来静态导出站点
* 基于Backbone.js的前端应用，可以打包成为一个OpenCMS支持的站点
* 后台任务处理服务（用于处理实时性要求不高的任务，如邮件发送等）

###面临的挑战及选择Docker的原因

在设计持续交付流程的过程中，这家企业有一个合理的需求：在测试环境中尽量模拟真实软件架构（如模拟静态服务器的水平扩展），以便尽早发现潜在问题。基于这个需求，我们认为，可以尝试将多台机器划分为不同的职责，并按照职责将相应服务进行部署。这时，我们遇到的第一个挑战是，硬件资源严重不足。尽管这家企业非常积极地配合，但无奈内部层层的审批制度。经过两个星期的努力，我们很艰难地申请到了两台四核CPU加8G内存的物理机（如果申请虚拟机可能还要等一段时间），同时还获得了一个Oracle数据库实例。因此，我们的任务就变为把所有服务和持续集成服务器（Jenkins）全部部署在这两台机器上，并且还要模拟出这些服务分别运行在不同职责的机器上并进行交互。如果采用传统的部署方式，要在两台机器上完成这么多服务的部署是非常困难的，需要小心调整和修改各个服务及中间件的配置，而且还面临着一旦出错就可能耗费大量时间排错，甚至需要重装系统的风险。第二个挑战是，企业内部对UAT（与产品环境配置一致，只是数据不同）和产品环境管控严格，我们无法访问，所以也就无法自动化。这意味着，整个持续发布流程不仅要支持自动化部署，同时也要允许下载独立发布包进行手工部署。

最终，我们选择用Docker解决上述两个挑战，主要有以下几点原因。

* Docker是容器，容器与容器之间相互隔离互不影响，利用这个特性可以非常容易地在一台机器上模拟出多台机器的效果
* Docker对操作系统的侵入性很低，因为它使用LXC虚拟化技术，所以在大部分Linux发行版下不需要安装额外的软件就可以运行
* Docker容器可重复运行，且提供了多种途径分享容器。例如，通过export/import或者save/load命令以文件形式分享；也可以通过讲容器提交至私有Registry进行分享；此外，还有Docker Hub

图2是我们设计的持续发布流程。我们专门设计了一个环节用于生成唯一的发布包，打包所有War/Jar、数据库迁移脚本和配置信息。因此，无论是手工部署还是利用Docker容器自动化部署，我们都可以使用相同的发布包，这样做也满足了持续交付的单一制品原则（Single Source of Truth, Single Artifact）。

###Docker与持续集成

持续集成（Continuous Integration, CI）在当前的软件开发中应用广泛。将CI与Docker结合后，会为CI的灵活性带来显著的提升。由于这个项目中使用的是Jenkins，则下面会以Jenkins与Docker结合为例进行说明。

####创建Jenkins容器

我们并没有直接把Jenkins安装到主机上，而是将其创建成容器，这样就省去了每次安装Jenkins本身及其依赖的过程，真正做到了拿来就用。

Jenkins容器创建一个全新CI的过程变得非常简单，只需下面一行命令就可完成：

```
docker run -d -p 9090:8080 --name jenkins
jenkins:1.576
```

该命令启动Jenkins容器并将容器内部8080端口重定向到主机9090端口，此时访问主机IP:9090，就可能得到一个正在运行的Jenkins服务。为了降低升级和维护成本，可将构建Jenkins容器的所有操作写入Dockerfile，并用版本工具进行管理。如果需要升级Jenkins，那么重新build一次Dockerfile即可。

```
FROM ubuntu
ADD source.list /etc/apt/sources.list
RUN apt-get update && apt-get install -y -q wget
RUN wget -q -0 - http://pkg.jenkins-ci.org/debian/jenkins-ci.org.key | apt-key add -
ADD jenkins.list /etc/apt/sources.list.d/
RUN apt-get update
RUN apt-get install -y -q jenkins
ENV JENKINS_HOME /var/lib/jenkins/
EXPOSE 8080
CMD ["java", "-jar", "/usr/share/jenkins/jenkins.war"]
```

每次build时标注一个新的tag：

```
docker build -t jenkins:1.578 --rm . 
```

另外，建议使用Docker volume功能将外部目录挂载到JENKINS_HOME目录（Jenkins会讲安装的插件等文件存放在这个目录），这样保证了升级Jenkins容器后已安装的插件都还在。例如，讲主机/usr/local/jenkins/home目录挂在到容器内部/var/lib/jenkins：

```
docker run -d -p 9090:8080 -v /usr/local/
jenkins/home:/var/lib/jenkins --name
jenkins jenkins:1.578
```

####将Docker容器作为Jenkins容器的Slave

在使用Jenkins容器时，我们有一个原则：不在容器内部存放任何和项目相关的数据。因为运行中的容器不一定是稳定的，而Docker本身也可能有Bug，所以将项目数据存放在容器中，一旦出了问题，就有丢掉所有数据的风险。因此，我们建议Jenkins容器仅负责提供Jenkins服务而不负责构建，将构建工作安排给其他Docker容器做。

例如，为了构建Java项目，需要创建一个包含JDK及其构建工具的容器。依然适用Dockerfile构建该容器，以下是示例代码（可根据项目实际需要安装其他工具，如Gradle等）：

```
FROM ubuntu
RUN apt-get update && apt-get install -y -q openssh-server openjdk-7-jdk
RUN mkdir -p /var/run/sshd
RUN echo 'root:change' |chpasswd
EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
```

在这里安装openssh-server的原因是Jenkins需要使用SSH的方式访问和操作Slave，因此SSH应作为每一个Slave必须安装的服务，运行该容器：

```
docker run -d -P -name java java:1.7
```

其中，-P是让Docker为容器内部的22端口自动分配重新定向到主机的端口，这时如果执行命令：

```
docker ps
804b1d9e4202    java:1.7    /usr/sbin/sshd -D    6 minutes ago
Up 6 minutes    0.0.0.0:49153->22/tcp java
```

端口22被重定向到了49153端口。这样，Jenkins就可以通过SSH直接操作该容器了（在Jenkins的Manage Nodes中配置该Slave）。

有了包含构建Java项目的Slave容器后，我们依然要遵循容器中不能存放项目相关数据的原则。因此，又需要借助volume：

```
docker run -d -v /usr/local/jenkins/workspace:/usr/local/jenkins -P -name java java:1.7
```

这样，我们在Jenkins Slave中配置的Job、Workspace及下载的源代码都会被放置到主机目录/usr/local/jenkins/workspace下，最终达成了不在容器中放置任何项目数据的目标。

通过上面的实践，我们成功地将一个Docker容器配置成了Jenkins的Slave。相比直接将Jenkins安装在主机上的方式，Jenkins容器的解决方案带来了一些明显的好处：

* 重用更加简单，只需一行命令就可获得CI的服务
* 升级和维护容易，只需要重新构建Jenkins容器即可
* 灵活配置Slave的能力，并可根据企业内部需要预先定制具有不同能力的Slave。例如，可以创建出具有构建Ruby On Rails能力的Slave和具有构建Node.js能力的Slave。当Jenkins需要具备某种能力的Slave时，只需要docker run将该容器启动，并配置为Slave，Jenkins就立刻拥有了构建该应用的能力

如果一个组织内部项目繁多且技术复杂，那么采用Jenkins结合Docker的方案会简化很多配置工作，同时也带来了效率的提升。

###Docker与自动化部署

说到自动化部署，通常不仅代表已自动化方式把某个应用放置在它应该在的位置，这只是基本功能。此外，它还有更为重要的意义：

* 以快速且低成本的部署方式验证应用是否在目标环境中可运行（通常有TEST/UAT/PROD等环境）
* 以不同的自动化部署策略满足业务需求（如蓝绿部署）
* 降低了运维成本，并促使开发人员和运维人员以端到端的方式思考软件开发（DevOps）

在这个案例中，由于上述第2个挑战的存在，导致无法将UAT乃至产品环境的部署全部自动化。回想客户希望验证软件架构的需求，我们的策略是尽量使测试环境靠近产品环境。

####标准化Docker镜像

很多企业内部都存在一套叫做标准化的规范，在这套规范中定义了开发中所使用的语言和工具的版本信息等，因为这样做可以统一开发环境并降低运维团队负担。在这个项目上，我们依据客户提供的标准化规范，创建了一系列容器并把它们按照不同的职能进行了分组，如图3。

我们把Docker镜像分为三层：基础镜像层，服务镜像层和应用镜像层，下层镜像的构建依赖上层镜像，越靠上层的镜像越稳定且不容易变。

* 基础镜像层，负责配置最基本的、所有镜像都需要的软件及服务，例如前文提到的openssh-server
* 服务镜像层，负责构建符合企业标准化规范的镜像，这一层很想SaaS
* 应用镜像层，和应用程序直接相关，CI的产出物

分层后，由于上层镜像已提供了应用所需要的全部软件和服务，所以可以显著加快应用层镜像构建的速度。曾经有人担心如果在CI中构建镜像会不会太慢？经过这样的分层是可以解决这个问题的。

在Dockerfile中使用FROM命令可以帮助构建分层镜像。例如，依据标准化规范，客户的产品环境运行RHEL6.3，因此在测试环境中，我们选择用CentOS 6.3来作为所有镜像的基础操作系统。这里给出从构建base镜像到Java镜像的方法。首先是定义base镜像的Dockerfile：

```
FROM centos
RUN yum install -y -q unzip openssh-server 
RUN ssh-keygen -q -N "" -t dsa -f /etc/ssh/ssh_host_dsa_key && ssh-keygen -q -N "" -t rsa -f /etc/ssh/ssh_host_rsa_key
RUN echo 'root:changeme' | chpasswd
RUN sed -i "s/#UsePrivilegeSeparation.*/UsePrivilegeSeparation no/g" /etc/ssh/sshd_config \
&& sed -i "s/UsePAM.*/UsePAM no/g" /etc/ssh/sshd_config
ssh/sshd_config
EXPOSE 22
CMD ["/usr/sbin/sshd", "-D"]
```

接着，构建服务层基础镜像Java，依据客户的标准化规范，Java的版本为jdk-6u38-linux-x64：

```
FROM base
ADD jdk-6u38-linux-x64-rpm.bin /var/local/
RUN chmod +x /var/local/jdk-6u38-linux-x64-rpm.bin
RUN yes | /var/local/jdk-6u38-linux-x64-rpm.bin &>/dev/null
ENV JAVA_HOMe /usr/java/jdk1.6.0_38
RUN rm -rf var/local/*.bin
CMD ["/usr/sbin/sshd", "-D"]
```

如果还需要构建JBoss镜像，那么将JBoss安装到Java镜像即可：

```
FROM java
ADD jboss-4.3-201307.zip /app/
RUN unzip /app/jboss-4.3-201307.zip -d /app/ &>/dev/dull && rm -rf /app/jboss-4.3-201307.zip
ENV JBOSS_HOME /app/jboss/jboss-as
EXPOSE 8080

CMD ["/app/jboss/jboss-as/bin/run.sh", "-b", "0.0.0.0"]
```

这样，所有使用JBoss应用程序都保证使用与标准化规范定义一致的Java版本和JBoss版本，从而使测试环境更靠近产品环境。

####更好地组织自动化发布脚本

为了更好地组织自动化发布脚本，版本化控制是必须的。我们在项目中单独创建了一个目录：deloy，在这个目录下存放所有与发布相关的文件，包括：用于自动化发布的脚本，用于构建镜像的Dockerfile及与环境相关的配置文件等，其目录结构是：

```
|-README.md
|-artifacts #war/jar, 数据迁移脚本等
|-bin       #shell脚本，用于自动化构建镜像和部署
|-images    #所有镜像的Dockerfile
|-regions   #环境相关的配置信息，我们只包含本地环境及测试环境
|-roles     #角色化部署脚本，会在bin中调用脚本
```

这样，当需要向某一台机器上安装Java和JBoss镜像时，用下面这条命令即可：

```
bin/install.sh images -p 10.1.2.15 java jboss
```

而在部署过程中，我们采用了角色化部署的方式。在roles目录下，它是这样的：

```
|-nginx
| └──deploy.sh
|-opencms
| └──deploy.sh
|-service-backend
| └──deploy.sh
|-service-web
| └──deploy.sh
└──utils.sh
```

这里我们定义了四种角色：ngix、opencms、service-backend和service-web。每个角色下都有自己的发布脚本。例如，当需要发布service-web时，可以执行命令：

```
bin/deploy.sh -e test -p 10.1.2.15 service-web
```

该脚本会加载由-e指定的test环境的配置信息，并讲service-web部署至IP地址为10.1.2.15的机器上。而最终，bin/deploy.sh会调用每个角色下的deploy.sh脚本。

角色化后，部署变得更为清晰明了，且每个角色单独的deploy脚本则更有利于划分责任，从而避免了和其他角色的干扰。

####构建本地虚拟环境

通常在提到自动化部署脚本时，大家都乐于说这些脚本如何简化工作增加效率，但是，其编写过程通常都是痛苦和耗时的，需要把脚本放在相应的环境中反复执行来验证是否工作正常。这就是我们建议最好首先构建一个本地虚拟化环境的原因。有了它，就可以在自己的机器上反复测试而不受网络和环境的影响。

Vagrant（http://www.vagrantup.com）是很好的本地化虚拟化工具，与Docker结合可以很容易地在本地搭建起与测试环境几乎相同的环境。以这个项目为例，可以使用Vagrant模拟两台机器。以下是Vagrant示例：

```
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
    config.vm.define "server1", primary: true do |server1|
        server1.vm.box = "raring-docker"
            server1.vm.network :private_network, ip: "10.1.2.15"
    end
    config.vm.define "server2" do |server2|
        server2.vm.box = "raring-docker"
            server2.vm.network :private_network, ip: "10.1.2.16"
    end
end
```

由于部署脚本通常采用SSH当方式连接，所以完全可以把这两台虚拟机看做是网络中的两台机器，可以调用部署脚本验证是否正确。

####构建企业内部的Docker Registry

前文提到了诸多分层镜像，那么如何管理这些镜像？如何更好地分享呢？答案就是使用Docker Registry。Docker Registry是一个镜像仓库，允许用户向Registry中提交（push）镜像，同时又可以从中下载（pull）。

构建本地的Registry非常简单，执行下面的命令：

```
docker run -p 5000:5000 registry
```

关于如何使用Registry的更多信息，参见：https://github.com/docker/docker-registry

在搭建好Registry后，就可以向它push自己的镜像了。例如：需要将base镜像提交至Registry：

```
docker push your_registry_ip:5000/
base:centros
```

而提交Java和JBoss也相似：

```
docker push your_registry_ip:5000/java:1.6
docker push your_registry_ip:5000/jboss:4.3
```

使用下面的方式下载镜像：

```
docker pull your_registry_ip:5000/jboss:4.3
```

###总结

本文分享了我们在实际项目中使用Docker的一些实践经验。我们认为Docker非常灵活，是一个多面手，给整个流程带来了极大的灵活性和扩展性，并且也展示了极好的性能，符合它天生就为部署而生的特质。

