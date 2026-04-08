---
layout: post
title: 我如何使用Obsidian
date: 2026-04-08 00:00:00
categories: blog2
summary: Obsidian是我最核心的个人知识管理工具。这篇文章整理了2023-2026年间关于Obsidian使用心得的系列分享：文件管理方式、常用插件、读书笔记、音乐笔记，以及引入Claude Code之后的Vibe Writing体验。
tags:
  - 程序媛
  - 终身学习
toc: true
---

几天前Karpathy分享了他的用[LLM创建个人知识管理系统的新方法](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)，Obsidian被点名之后又迎来一波迁移潮。当然我并不完全认同他分享的方式——一段时间的Vibe Coding/Writing之后，我发现让AI来帮助思考、总结、搭建和创作确实提高效率，但是我失去了训练大脑的机会——对于繁杂的重复性的事务让AI来处理还行，但有时候绕过思考、总结和自发创作这一步，我们的大脑就失去了真正内化这些知识的机会——我之前写的[学习的本质](/blog2/2023/10/21/effective-learning.html)这篇博客里对此有些讨论。

即使没有LLM加持，Obsidian仍是一款非常优秀的个人知识管理系统软件。2022年接触Obsidian后我马上把大部分个人笔记迁移了过来。之后我在社交平台上写了一系列的关于使用Obsidian的心得：如何管理文件（仅用index文件、tag和一个文件夹）、常用插件、如何做读书笔记、音乐笔记、以及引入AI之后的配置和优化等。

> 这篇文章收集整理2023-2026的一些分享文章，纯手工写作。到2026年初Claude Code对于Non-ASCII字符处理仍有bug，导致我没有办法用它高效Vide Writing输出中文文章。这篇文章仅用Claude Code阅读校对。

### 为什么选择Obsidian作为常用笔记工具

我的电子笔记工具使用历史是这样的：Evernote → Google Doc / Google Keep / OneNote → Notion / Google Doc →  Obsidian / Google Doc / Goodnotes。最终**Obsidian**成了我最常用也是核心的笔记工具。

在使用Obsidian之前，我虽然也用电子笔记工具，但是还是非常依赖纸质笔记本。入坑Obsidian之后，逐渐通过它支持的几个强大的插件和优化自己的笔记方式实现了完全无纸化的学习、读书、写作和工作笔记。

为什么选择Obsidian作为主要的笔记工具，简短的说，三个核心设计思路让它异常出色：

##### 🟢 轻量级跨平台的文件格式

- 使用markdown。可以直接导出md或者html到其他平台。
- 离线存储优先，不依赖网络，使用没有卡顿，写作体验丝滑——“卡”是我放弃Notion的原因，不知道Notion现在是否已经提升了体验。
- 支持云端同步，可以跨设备使用。（付费）
- 也可以把笔记源文件同步到任何云服务Dropbox, GDrive, GitHub，S3等等，本地使用Obsidian打开，保证云端备份又没有安全隐患。

##### 🟢 强大的JS插件能力

- 基于js的web工具可以快速集成，如Excalidraw，Mermaid Chart等。还有各种官方非官方的自动化工具和集成工具，几乎可以实现没有手写板支持的无纸化速写笔记。

##### 🟢 文件关联体系

- 非常便捷的实现文件之间的超链接和段落引用。
- 强大的可视化，很好的帮助你建立知识体系，让笔记成为你的“第二大脑”。

就看这张文件关联的可视化图，它和Learning how to learn里关于大脑思维模式的插画有异曲同工之妙。

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/obsidian_share_1.excalidraw.png" style="max-width: 600px;">

### 怎么在日常学习和工作中使用Obsidian

我只有两个常用的Vault：工作笔记和个人笔记。工作笔记直接在公司GDrive下创建，没有多平台同步，只是工作使用。GDrive本身随时保证本地和云端的同步，也是企业私有，没有数据安全的隐患。个人笔记我开通了付费的Sync服务，多平台同步，无论是手机端还是电脑端都随时可以打开记录。

文件管理我参考了油管博主分享，没有分文件夹管理，所有文字笔记在一个目录下，通过建立几个Index索引文件来分类。一些同类型文件通过打tag和dataview自动生成列表。大部分文件是分散的，仅仅是通过各种双链相互引用：这也是Obsidian的精髓，完全符合INFP的发散思维思考模式。

### 我的个人Obsidian Vault一览

我的个人 Obsidian Vault 里有如下索引文件。

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/obsidian-reference-15.png" style="max-width: 300px;">

##### 📝 人生备忘录

这里是日常生活的备忘录。先放一个关于这一年的Vision Board链接和几个关键词，提醒我今年我最需要关注的事情是什么。然后就是记录日常家庭事务，包括但不限于：
- 日常采购清单
- 记账
- 朋友住址备忘
- 保险报销和理赔进度
- 阿姨工作安排等等

用了简化的GTD(Getting Things Done, by David Allen)来记录待办事项和个人想法，再用Claude帮我定期整理，提醒和安排优先级。

##### 🕌 大教堂与集市

《大教堂与集市》是开源运动的圣经，影响了整个软件开发领域，用来命名我的Tech笔记再适合不过。这里记录但不限于：
- 算法学习和系统设计笔记（面试基本功）
- 代码、架构、软件设计、分布式、大数据、devops等经典书、网课和论文笔记
- 常见库、框架学习笔记
- 经典开源项目收集

##### 🔥 小小小的火

关于FIRE，关于投资理财：
- 每年投资理财总结、计划和目标
- 链接家庭和个人财务记录追踪（gdoc）
- 家庭保险、储蓄投资、退休财务规划、遗产规划、房产投资的学习和资源收集

##### ✍🏻 笔耕不辍

Blog/Plog 写作和灵感集。对生活、职业、自我成长等的反思，主动输出。四个主题分类：
- 日常Plog-快速输出的一些短小的文章，包括生活经验、投资理财笔记、职场反思等等
- Life Journal-维护独立域名博客十余年，把日常零散的思考、生活学习hacks、读书笔记和游记等整理成长文
- Tech Blog-读博开始用英文写Tech blog，带给了我一些技术成长和职业发展的契机
- Personal Finance Blog-几年前开始认真写投资理财学习笔记

##### 🐳 骑鲸之旅

孩子们相关：
- 哥哥生日派对策划细节，音乐、足球、游泳、语言等课外班的学习记录
- 弟弟作息喂养记录、托班筛选等等
- 一些养育知识的收集和记录，比如常用药储备、小朋友的财商培养等

##### 🌷 朝画夕拾

朝画夕拾是我早年在博客大巴上的个人博客名字（谁还记得这个古老的文艺青年博客平台呢）。名字来源于个人爱好画画和写作，所以这里全是关于自我的
- 时尚：个人胶囊衣橱搭建、符合自身气质和品味的设计师品牌收集
- 家居：家居设计和装修笔记
- 绘画：水彩画的学习笔记、练习作品归档（已经停滞了很多年，但总觉得自己哪天会再重拾）
- 音乐：Ukulele和吉他谱归档，乐理知识学习笔记
- 美食：减脂菜单、烘培recipe、喜欢的美食探店等等

##### 📚 书架

通过WeRead和Readwise自动同步微信阅读和Kindle上的电子书和读书笔记。下面会具体写如何在Obsidian里整理读书笔记，并一键发布到个人博客上。

### Obsidian常用插件

虽然Obsidian的社区插件非常丰富，但在我的日常笔记中高频使用的插件并不多。我比较认同的观点是工具只是为了提高效率，流程简化也是提高效率的重要一环，少而精才好。基本的版面和格式优化的小插件如Advanced tables, Calendar, Templater, Dataview就不多聊了。这里是个我认为的学习工作效率神器：

##### Flashcard：把笔记重点直接转换成Anki闪卡，强化短期记忆的神器。

安装插件后，同时需要安装Anki桌面应用，配置权限。之后就可以在Obsidian笔记中用 `#card` 或其他可自定义的格式把笔记记成闪卡问答的形式。然后一个命令行就能导出闪卡到Anki应用中。Anki有多平台支持，可基于记忆曲线来复习闪卡。

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/obsidian_plugin_flashcard.excalidraw.png" style="max-width: 600px;">

##### Readwise / WeRead：一键同步kindle和微信读书笔记，电子化读书笔记神器

授权kindle和微信读书后，可以直接导入电子书中高亮和笔记。

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/obsidian-reference-01.png" style="max-width: 600px;">


##### Excalidraw：非常简单顺手的画图工具

Excalidraw是非常受欢迎的开源画图软件，和Obsidian的集成很好，可以直接在图表中用双链接语法引用文字，图片甚至其他图表。画风默认是手写形式，基本可以取代用手画图。

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/obsidian-reference-02.png" style="max-width: 600px;">

##### mermaid流程图（非插件，Obsidian markdown parser原生支持）

在code block开头加上`mermaid`关键字，就可以直接使用mermaid代码生成流各种图表。

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/obsidian-reference-03.png" style="max-width: 600px;">

##### LaTeX数学表达式（非插件，Obsidian markdown parser原生支持）

用`$$`关键字就可以直接输入LaTeX数学表达式

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/obsidian-reference-04.png" style="max-width: 600px;">
### 无纸化读书笔记——闲书

我小时候应该算是个读书笔记达人。初中时语文老师要求暑假阅读要读书笔记，我莫名的写得非常有热情，写了厚厚几本。

后来读书也断断续续做一些笔记，但是时间一长，笔记本不知道放哪里去了。现在虽然还是更喜欢读纸质书，也不能否认电子书的便捷——随时随地拿出手机就可以阅读。还有一个很大的优势是，电子书记笔记更容易——不需要随时拿着一个笔记本，也易于整理，还不会轻易丢失。我慢慢的优化了阅读→记录→保存这个流程。

这里用到的就是Obsidian的两个插件[Readwise](https://github.com/readwiseio/obsidian-readwise)（同步Kindle）和 [WeRead](https://github.com/zhaohongxuan/obsidian-weread-plugin)（同步微信读书）。

以WeRead为例，授权微信读书后，可以自动把微信读书里的摘抄和笔记同步到Obsidian文件中，一本书自动生成一个文件。在插件配置中可以自定义输出的格式，这里我把笔记放在了`<figcaption class="reading-notes"></figcaption>` tag里。因为在个人博客上我用同样的HTML tag和CSS来排版。

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/obsidian-reference-11.png" style="max-width: 600px;">

比如这篇《暮色将尽》的摘抄和读书笔记，通过插件同步自动生成，再稍加修改完成。直接复制粘贴到同样基于markdown的博客文章里。最后上传自动发布——排版好的读书笔记就直接加入了我的电子书架。博客我用的Jekyll搭建在GitHub page上，轻量级易维护很稳定，已经跑了十几年了。查看整理笔记相当于二次阅读，有时也会有新的灵感或者想要再重温一下原著。

Obsidian里自动从微信读书同步读书记：

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/obsidian-reference-05.png" style="max-width: 600px;">
个人博客上的读书笔记归档：

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/obsidian-reference-07.png" style="max-width: 600px;">

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/obsidian-reference-08.png" style="max-width: 600px;">

### 无纸化读书笔记——技术书

如果是要精读一本工具书或教课书，阅读和笔记方法会非常的不同。之前在学习的本质里聊过，知识学习有几个关键：focus mode, chunking, active recall, spaced repetition。

其实就是我们小时候的学习方式：课堂学习（focus mode) → 消化吸收，基于理解的背诵记忆（chunking）→ 通过习题和考试强化学习效果（active recall, spaced repetition）。

主动学习需要的专注、记忆、反复练习都是困难的事情。如果没有学校课堂和老师的约束，我们很容易放弃做困难的事，因为我们的大脑会本能的去逃避困难。我们的学习方式因此变成低效划线和摘抄。

无效的学习方法
- 反复阅读学习资料
- 划线
- 抄写记笔记法

有效的学习方法
- 主动回忆（Active Recall）
- 间隔重复（Spaced Repetition）
- 知识分类（Categorization）
- 穿插学习（Interleaving)
- 记录（Progressing）

转换笔记方式，可以有助我们更高效的学习。

首先记笔记不是能单纯的摘抄，笔记尽量转化为问答的形式。其次回答自己提出的问题的时候，不要用书本的原文，自己组织语言回答，也可以加入图标帮助理解（active recall）。最后就是要让大脑通过各种方式来反复提取这些知识点，克服记忆曲线把短期记忆转化为长期记忆（saced repetition）。这里还是主要用Obsidian原生功能加上Flashcard和Excalidraw插件。

1. 在Obsidian里，加入code snippet, mermaid chart(UML diagram), LaTeX都是原生支持的，非常方便。视频音频也可以加双链直接显示。可以非常高效地记录内容丰富的笔记
2. 用问答的形式来记笔记：把一个知识点写成一个问题，再用自己的话来回答
3. 用Flashcard插件能把这一系列问题串起来。通过加 `#card` 这个标签，Flashcard插件会自动把这个问答笔记转化成闪卡同步到Anki应用里。利用Anki app可以在各种不同的时间地点复习知识点（科学研究表明，转换地点对于加强记忆也有利，所以可以利用手机里的Anki card在不同地点复习闪卡）
4. 整理笔记，发表成博客文章。Obsidian原生就是markdown格式，稍微调整一下层级结构和整理链接，就可以集成到我的博客系统中（jekyll+github）

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/effective-study-anki-obsidian.excalidraw.png" style="max-width: 600px;">

### 无纸化乐理知识笔记和琴谱 🎼

2024年想要学习新技能——钢琴。从最基础的乐理知识开始。选了一门Coursera的基础课：[The fundamental of music theory by the University of Edinburgh](https://www.coursera.org/learn/edinburgh-music-theory)。

这次Obsidian笔记又展示出了它的强大：无缝集成[music-abc js]([https://www.abcjs.net/](https://github.com/abcjs-music/obsidian-plugin-abcjs))插件，可以快速的记乐谱，并且单击可以发出音乐声。

这样在跟着视频记笔记的过程中，可以用notation来记乐谱。这对吸收和复习老师讲的知识点非常有帮助。第一周的课基本就是讲octave（八度），note（音符），stave（五线谱），modes（调式），chords（和弦）等，训练基本的识谱能力。识谱挺考验人的记忆力和反应力的，我小时候音乐课反正是学得不好。用Obsidian记笔记就是一个很好的练习过程，因为需要把五线谱转化成对应的ABC notation。学习音乐也需要耳朵打开，对比手写或者截图的乐谱，用music-abc记录的乐谱是有声的，点击就可以播放，对于认识音阶、调式、和弦很有帮助。

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/obsidian-reference-09.png" style="max-width: 600px;">


还发现了一个音乐相关插件[obsidian-chord-sheets](https://github.com/olvidalo/obsidian-chord-sheets)，可以记ukulele谱子，也很好用。

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/obsidian-reference-10.png" style="max-width: 600px;">


### Vibe Writing体验

我越多地使用AI来做编程和其他事情，就越意识到：我大多数时间都在写markdown。

我自然想到在 Obsidian vault 目录里直接运行 `claude` 命令。Teresa Torres 在这个播客[Full Tutorial: Build Your Personal OS with Claude Code in 50 Min](https://www.youtube.com/watch?v=uBJdwRPO1QE) 中，分享了她如何使用Obsidian和Claude Code来管理工作日，并把生产力提升10倍。她描述自己在Obsidian旁边打开两个终端窗口来协同工作。

这当然是可行的。

但我并不太喜欢在Obsidian之外再单独打开终端窗口。我想要那种Vibe Coding的体验——或者说Vibe Writing——终端就放在主工作面板旁边，让一切都显得无缝衔接。

借助[Obsidian Terminal](https://github.com/polyipseity/obsidian-terminal)插件，这件事其实非常容易实现。

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/blog1/obsidian_times_claude/obsidian-claude-final.png" style="max-width: 600px;">

我还可以通过调试过的 prompt，为常用任务创建自定义的 slash commands，比如：

* `/proofread`
* `/summarize`
* `/translate_to_cn`
* `/translate_to_en`

等等。

### AI自动化日常规划和知识管理的尝试

在Obsidian里跑上Claude Code后几个小尝试:

##### 记账

最最基本的一个使用。

记账是今年的一个KPI。开一个空白文档，按一个简单的格式记录每笔消费：买什么/在哪买/怎么付款/多少钱。让Claude Code分析一下这个文档，详细的总结就出来了。完全不需要花哨的记账App或者繁琐的电子表格。

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/claude-code-spending-tracking-analysis.png" style="max-width: 600px;">

##### GTD (Getting Things Done)

Obsidian里我已经用了一个插件构建简易的GTD系统。这个插件其实就是让我把所有代办事项快速写入一个inbox文件。插件根据时间线会展示一个Todo list。定期我会检查一下inbox，调整优先级和清理完成事项等。

尝试了让Claude Code读取inbox文件，帮我检查和安排优先级。刷刷，一个清晰的总结列表给了我，合理地排出了优先级和指出我没有太注意但重要的事务，比如我爸的保险缴费。

Claude也建议我把完成事项归档到另外一个备份文件，既留有备份又保持inbox清爽。好主意，让它帮我做了。

最后我在当前context下让Claude帮我写了一个prompted slash command /gtd，把以上任务——检查代办事项、排优先级、归档总结完成事项一次性完成。之后我只需要一键跑 /gtd，就可以了。

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/claude-code-gtd.png" style="max-width: 600px;">

##### Blog写作

在Obsidian里写东西很流畅，因为是markdown文件，很容易导入到静态网页生成器如Jekyll、Hexo、Hugo里，再发布到个人blog。唯一一个需要重新人工编辑的是图片的发布和引用。Obsidian里双链引用本地图片，但一旦要发布，我要先把本地文件上传到云端(S3)，再在markdown里引用图片超链接。

之前一直懒得写脚本自动化这件事。突然想起来这件事对Coding Agent来说太简单了吧。给Claude Code需求后，它快速地定位本地已经配置好的aws cli，几个shell commands搞定了自动化图片上传和文章链接更新。

Claude Code也有翻车的时候，对于non-ASCII字符支持有bug，中英文互译或者中文编辑时经常出错退出。目前只有用回Copilot帮我翻译和阅读校对。

<img src="https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/obsidian-pkm/claude-code-s3-slash.png" style="max-width: 600px;">
