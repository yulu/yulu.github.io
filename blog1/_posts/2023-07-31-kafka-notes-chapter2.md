---
layout: post
title:  "[Kafka Guide] Chatper 2 Install Kafka"
date:   2023-07-31 19:00:00
categories: blog1
tags: "reading_notes Kafka"
---

### Hands-on

##### Running on AWS EC2 (ubuntu, t2.micro)

- ssh to server
```shell
ssh -i yulu-mac.pem ubuntu@xx.xx.xx.xx
```

- install java 11
```shell
sudo apt-get update
sudo apt install openjdk-11-jre-headless
```

- install zookeeper
```
wget https://dlcdn.apache.org/zookeeper/zookeeper-3.5.10/apache-zookeeper-3.5.10-bin.tar.gz
tar -zxf apache-zookeeper-3.5.10-bin.tar.gz
mv apache-zookeeper-3.5.10-bin /usr/local/zookeeper
mkdir -p /var/lib/zookeeper
cp > /usr/local/zookeeper/conf/zoo.cfg << EOF
> tickTime=2000
> dataDir=/var/lib/zookeeper
> clientPort=2181
> EOF
export JAVA_HOME=/usr/java/jdk-11.0.10
/usr/local/zookeeper/bin/zkServer.sh start
```

- install kafka and config the heap (since t2.micro has only 1G memory)
```
wget https://downloads.apache.org/kafka/3.4.0/kafka_2.13-3.4.0.tgz
tar -zxf kafka_2.13-3.4.0.tgz
mv kafka_2.13-3.4.0 /usr/local/kafka
mkdir /tmp/kafka-logs
export JAVA_HOME=/usr/java/jdk-11.0.10
export KAFKA_HEAP_OPTS="-Xmx256M -Xms128M"
/usr/local/kafka/bin/kafka-server-start.sh -daemon /usr/local/kafka/config/server.properties
```

##### Running on Mac
- install
```shell
brew install kafka
```

- start zookeeper
```shell
/opt/homebrew/bin/zookeeper-server-start /opt/homebrew/etc/zookeeper/zoo.cfg
```

- start kafka
```shell
/opt/homebrew/bin/kafka-server-start /opt/homebrew/etc/kafka/server.properties
```

##### Test the Kafka broker is working

- send from producer console
```shell
kafka-console-producer --broker-list localhost:9092 --topic test
> send first message
> send second message
> wow it is working
```

- consume by the consumer console
```shell
kafka-console-consumer --bootstrap-server localhost:9092 --topic test --from-beginning
send first message
send second message
wow it is working
```

### Configuring the Broker

##### General Broker Parameters
- `broker.id`: every Kafka broker must have an integer identifier, which is set using the `broker.id`
- `listener`: A listener is defined as `<protocol>://<hostname>:<port>` e.g. `PLAINTEXT://localhost:9092,SSL://:9091` 
- `zookeeper.connect`: The location of the ZooKeeper used for storing the broker metadata is set using the zookeeper.connect configuration parameter. The format for this parameter is a semicolon-separated list of `hostname:port/path` strings
	- hostname: the hostname or IP address of the ZooKeeper server
	- port: the client port number for the server
	- /path: an optional ZooKeeper path to use as a chroot environment for the Kafka cluster. If it is omitted, the root path is used

> Why use a Chroot path?
> 
> It is generally considered to be good practice to use chroot path for the Kafka cluster. This allows the ZooKeeper ensemble to be shared with other applications, including other Kafka clusters, without a conflict. It is also best to specify multiple ZooKeeper servers in this configuration. This allows the Kafka broker to connect to another member of the ZooKeeper ensemble in the event of server failure

- `log.dirs`: log segments are stored in the directory specified in the `log.dir`. For multiple directories, `log.dirs` is preferable. Kafka broker will store partitions on them in a "least-used" fashion, with one partition's log segments stored within the same path.
- `num.recovery.threads.per.data.dir`: kafka uses a configurable pool of threads for handling log segments. By default, only one thread per log directory is used. The configurable parameter sets the number of threads per directory
- `auto.create.topics.enable`: the default Kafka configuration specifies that the broker should automatically create a topic under some circumstances. However if you are managing topic creation explicitly, you can set this parameter to `false`
- `auto.leader.rebalance.enable`: in order to ensure a Kafka cluster doesn't become unbalanced by having all topic leadership on one broker, this config can be specified to ensure leadership is balanced as much as possible.
- `delete.topic.enable`: depending on your environment and data retention guidelines, you may wish to lock down a cluster to prevent arbitrary deletions of topics. Disabling topic deletion can be set by setting this flag to `false`.

---

##### Topic Defaults Parameters
- `num.partitions`: how many partitions a new topic is created with. 
	- keep in mind that the number of partitions for a topic can only be increased, never decreased. 
	- many users will have the partition count for a topic be equal to, or a multiple of, the number of brokers in the cluster.
- `default.replication.factor`: If auto-topic creation is enabled, this configuration sets what the replication factor should be for new topics
- `log.retention.ms`: the most common configuration for how long Kafka will retain messages is by time. The default is specified in the configuration file using the `log.retention.hours` parameter. However, there're two other parameters allowed: `log.retention.minutes` and `log.retention.ms`. All three of these control the same goal - **the amount of time after which messages may be deleted**. 
- `log.retention.bytes`: another way to expire messages is based on the total number of bytes of messages retained. 
- `log.segment.bytes`: once the log segment has reached to the size specified by this parameter, which defaults to 1GB, the log segment is closed and a new one is opened. Once a log segment has been closed, it can be considered for expiration. 
- `log.roll.ms`: another way to control when log segments are closed. This parameter specifies the amount of time after which a log segment should be closed. 
- `min.insync.replicas`: when configuring your cluster for data durability, setting `min.insync.replicas` to 2 ensures that at least two replicas are caught up and "in sync" with the producer. Refer to [DDIA-Chapter5 replication](/blog1/2023/04/10/ddia-5.html)
- `message.max.bytes`: this limits the maximum size of a message that can be produced, defaults to 1 MB.

### Summary as Ankicard

💡 What are the two simple commands to test a Kafka server?

```shell
kafka-console-producer --broker-list localhost:9092 --topic test
kafka-console-consumer --bootstrap-server localhost:9092 --topic test --from-beginning
```

💡 What is `broker.id` config?

Every broker must have a integer identifier

💡 What is `log.dirs` config? 

Where the log segments are stored in `log.dir`, for multiple directories, `log.dirs` are preferable. 

💡 How will Kafka broker store the partitions in multiple log directories if `log.dirs` is configured?

Kafka will store the partitions in a "least-used" fashion

💡 What configuration will prevent Kafka to automatically create topic by sending message to a non-existing topic? 

`auto.create.topics.enable`

💡 Which parameter configs how many partitions a new topic is created with? 

`num.partitions`

💡 Can the number of partitions for a topic be decreased?

No, the number of partitions for a topic can only be increased

💡 What is the replication factor configured by `default.replication.factor`? 

It is the number of copies of data across several brokers. It should be greater than 1 to ensure the reliability

💡 What is the `min.insync.replicas` config and how does it ensure the reliability?

You should set this to 2 at least to ensure that at least two replicas are caught up and "in sync" with the producer. This enables the semi-sync replication strategy.

💡 How does `log.retention.ms` and `log.retention.bytes` works differently as Kafka's retention policies?

`log.retention.ms` is the most common retention policy - for how long the Kafka will retain the message, it indicates the amount of time after which messages may be deleted.
`log.retention.bytes` indicates once the log segment has reached to the size specified by this parameter (defaults to 1GB), the log segment is closed and a new one is opened. Once a log segment has been closed, it can be considered expiration. 
