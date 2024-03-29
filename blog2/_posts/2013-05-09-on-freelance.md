---
layout: post
category: blog2
date: 2013-05-09 21:00:00
title: 第一次尝试独立开发的经验和感悟
image_url: 'https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog2/archive/16473363233_14bdde6b6e_h.jpg'
summary: 这是第一次独立完成一个Android手机App的开发——从立意构思，后程算法，界面设计，调试测试，到最后放上商店的各种文案都是自己一个人完成的。虽然是一个功能略单薄，设计也稍显稚嫩的应用，我也并没期望从中能获得任何收益，但是这个过程中学到的各种知识和能力对我很是受用和鼓舞。所有的这些收获最终也确实转化成了新的契机，让我能继续在设计和开发的路上走下去。
tags: "程序媛 创业"
---

这是第一次独立完成一个Android手机App的开发——从立意构思，后程算法，界面设计，调试测试，到最后放上商店的各种文案都是自己一个人完成的。虽然是一个功能略单薄，设计也稍显稚嫩的应用，我也并没期望从中能获得任何收益，但是这个过程中学到的各种知识和能力对我很是受用和鼓舞。所有的这些收获最终也确实转化成了新的契机，让我能继续在设计和开发的路上走下去。在这里记录经验和感悟，希望能与大家分享，特别是那些和我一样，跃跃欲试但对自己还有所怀疑的朋友，至少踏出第一步并不难。

#### 从哪里寻找灵感？

我平时喜欢画画和码字，有任何的灵感和想法都会马上记录下来（常用的是google keep），等有空闲时间再开始具体做。关于App的立意，也单开了一页来记录。大部分的想法都是来自于自己的生活经历，尤其是感觉自己需要什么又缺少时，常常能得出一些新鲜想法（这与[Paul Graham](http://paulgraham.com/startupideas.html)关于寻找创业想法博文里的观点不谋而合）。偶尔与朋友交流，也有热情的朋友给我提议他们的想法，觉得有趣的我也会一并记下。第一次尝试，过程中肯定会遇到阻碍和不尽如人意的地方，这时热情和兴趣是支撑自己坚持下去的最大动力。所以最好选一个让自己想起来都会兴奋不已的项目。

<figcaption>
我的google keep
</figcaption>
>![freelance-1](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog2/archive/16471042374_c51191d121_n.jpg)

我喜欢和图像打交道，不管是用一支笔一张纸画画涂鸦，还是在photoshop里开一个窗口调试一堆参数，甚至写一段代码处理复杂的计算机视觉问题。我喜欢视觉上的丰富和美好，期望把自己看到的感受到的与人分享。于是，我决定写一个美化照片表达心情的相机App。

<figcaption>
为app做的文案
</figcaption>
>![freelance-2](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog2/archive/16905715448_1238e57cae_n.jpg)

#### 需要多硬的基本功？

三年前我大学毕业，拿的是机械工程学位，主修航空航天——一个完完全全的计算机菜鸟。后来因为个人兴趣和机缘巧合走上了程序员之路。学习Android开发也不到两年时间，并且期间只是针对自己研究课题的算法尝试了基础的开发，写的App都没有完整成型的界面，也从不做后期测试，能跑出实验结果就好。唯一两次相对完整的开发经验，一是指导学生的毕业设计，开发一款样子还算过得去的LBS校园导航应用——用了现成的Google Maps API和Android默认的图像元素；还有一次是在一个小团队项目里负责用户界面设计，但也是浅尝辄止——只需要画四个按钮和一个图标。而我就是在这样的状态下，萌发要独立写一个App的想法。

<figcaption>
第一次做UI的效果
</figcaption>
>![freelance-3](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog2/archive/17093493725_98dfaec804_n.jpg)

虽然已经有一定专业知识，但是要做出想要的东西似乎还远远不够——那就学习吧。App中用到核心的图像处理算法，参考了github上的开源Android项目，GIMP这样的开源软件，也从参考书里的范例里举一反三自己设计。各方涉猎，也颇有收获。更重要的是不要犹豫，直接把理论付诸实践，有些很看似不能解决的问题，在真正开始着手做之后总能找到突破口。

<figcaption>
图书馆抱回的书
</figcaption>
>![freelance-4](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog2/archive/16471045754_f4d6a2b089_n.jpg)

做独立开发还需要懂一点设计，幸运的是我那些平日里喜欢拍照涂鸦的个人爱好这时都可能发挥功效了。但是没有受过任何专业指导的我，也只是犹如盲人摸象一样，凭着感觉设计一堆图像元素，拼凑着放到界面上。

<figcaption>
在Illustrator里画的UI设计
</figcaption>
>![freelance-5](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog2/archive/17092801741_bd12d8f812_n.jpg)

之前读过一本很受欢迎的设计指南《Mobile Design Pattern Gallery》，这本书比较系统的总结了Android和IOS应用界面设计的基本形式。但其实只要平时用过较多的App，对这些设计也大概都有概念了。我觉得学习总是从临摹开始的，自己不懂，就去看别人怎么做的，跟着学跟着做慢慢就会找到自己模式。所以朋友把玩我的iPad时颇为无奈——怎么全是相机App！

<figcaption>
我的ipad截屏
</figcaption>
>![freelance-6](https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog2/archive/16905937710_26e88e9ef6_n.jpg)

最后发现做设计开发真不是难事。这里分享一个让我捧腹的故事：[编程小白插画家Christoph，是如何开发自己第一个iphone App的](http://www.ifanr.com/265414?utm_source=feedlyhttp://www.newyorker.com/online/blogs/culture/2013/03/christoph-niemann-petting-zoo-app.html)。文中有一个8秒的视频，作者拍摄他自己终于在iPhone上实现了“手指点击使方块变色”的效果——文中这些呆萌的视频和插画，配合他幽默风趣的讲述，实在令人忍俊不禁。但是仔细读下去，就会惊叹他竟能把这样简单的触屏效果结合到自己的插画中，最后终于做出了自己理想中的App。他表达的化繁为简的设计理念，以及他求知若渴的学习态度，着实让人钦佩。

#### 开发之外的那些事

写App是件很有意思的事，特别当你也是个脑子里充满创意又有一定的设计师码农属性的人。一个App开发周期不长，上架门槛也不高，所以很容易从中获得成就感。作为独立开发者，也可以适当的把自己的情绪和喜好放到自己的App中，这也带来了一定的满足感。对于我，开发一个App就像我从前画画一样，可以尽情的去创造和表达，只是用的工具和方式要复杂一些。

但是考虑到“面包”的问题，独立App开发似乎进退艰难。默默的把App放上架，没有任何宣传，几乎不可能造成什么影响。上架后也时不时会收到一些邮件，提供有偿的宣传刷榜服务等等，虽然深知这是这个生态系统中不可或缺的一环，但是作为设计者，对于这样粗暴地消费创造力的行为，总是有点抗拒。分享两篇让人驻足思索的文章《[个人开发者之死](http://blog.jobbole.com/32658/)》《[独立app生存焦虑：被编收还是自寻出路](http://www.linuxeden.com/html/itnews/20130409/138003.html?utm_source=feedly)》。不可否认这个市场正在趋近饱和，但是机遇也从来不缺。蓬勃发展中的IT移动互联网业，各种优秀的个人，团队，创意层出不穷，最终影响世界的也只有那么屈指可数的几个。犹如中世纪文艺复兴时期，思想的火化无处不在，但是大众只记住了那几个名字而已。

而我始终相信有技术的人不会没有出路，不过在梦想和现实之间的平衡尤其重要。