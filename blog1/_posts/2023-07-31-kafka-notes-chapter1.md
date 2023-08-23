---
layout: post
title:  "[Kafka Guide] Chapter 1 Meet Kafka"
date:   2023-07-31 19:00:00
categories: blog1
tags: "reading_notes Kafka"
---

### What Problems does Kafka Solve

> ##### How Kafka comes in to save the data transportation problems here
>
> Apache Kafka was developed as a publish/subscribe messaging system designed to solve the above problem - a distributing streaming platform.
> A filesystem or database commit log is designed to provide a durable record of all transactions so that they can be replayed to consistently build the state of the system. Similarly, data within Kafka is stored durably, in order, and can be read deterministically. In addition, the data can be distributed within the system to provide additional protections against failures, as well as significant opportunities for scaling performance. 


##### direct-connection in/out data communications between services is difficult to trace
![][kafka-chapter1-1.jpeg]

##### use a pub/sub pattern
![][kafka-chapter1-2.jpeg]

##### multiple publish/subscribe systems to support different biz use cases
![][kafka-chapter1-3.jpeg]

### Summary as Ankicard

💡 What problem does Kafka solve? 

Kafka is a pub/sub messaging system what is designed to decouple the business services by introducing the async communication and group the communication channel using topic. A typical Kafka architecture looks like this

💡 What are the main 3 characteristics Kafka has?

- Data within Kafka is stored durably
- Data can be read deterministically (in-order)
- Data can be distributed for reliability and scalability

💡 What is the use of the 'key' in Kafka? 

Key is an optional metadata comes with the message, it will be hashed and used to decide which partition the message goes. Kafka brokers make sure that message comes with the same key goes to the same partition so they can be consumed in order. e.g. for mod-N partition, key is used to generate a consistent hash and used to select the partition number for that message so the same key are always written to the same partition

### Basic Concepts
**message**:: the unit of data in Kafka, just an array of bytes as far as Kafka concerned

**key**:: an optional piece of metadata of the message. Keys are used when messages are to be written to partitions in a more controlled manner. e.g. for mod-N partition, key is used to generate a consistent hash and used to select the partition number for that message so the same key are always written to the same partition  

**batch**:: a collection of messages - messages are written into Kafka in batches

**schemas**:: JSON, XML or Apache Avro, basically the serialisation protocol

---
**topic**:: analogies for a topic are a database table or a folder in a filesystem - group the same concept data into a channel

**partitions**:: topics are broken down into a number of partitions. A partition is a single log. Messages are written to it in an append-only fashion and are read in order from beginning to end. Partitions can be distributed and replicated for scalability and reliability. 

![][kafka-chapter1-4.jpeg]
---

**producers**:: create new messages. By default, the producer will balance messages over all partitions of a topic evenly. In some cases the producer will direct messages to specific partitions, done using the message key. 

**consumers**:: read messages. The consumer read messages in the order in which they were produced to each partition. It keeps track of the offset - a metadata with the message to keep track of which messages it has already consumed.

**consumer group**:: one or more consumers that work together to consume a topic. The group ensures that each partition is only consumed by one member. 

![][kafka-chapter1-6.jpeg]

> 💡 What if there's larger number of consumers (in a consume group) than the number of partitions? 
> 
> Some of the consumers will be idle. Because one partition cannot be consumed by multiple consumers. 
> ![][kafka-chapter4-4.jpeg]

---
**broker**:: a single Kafka server. It receives messages from producers, write messages to storage on disk and services consumers. - A single broker can easily handle thousands of partitions and millions of messages per second.

**cluster**:: a cluster of brokers has a leader broker and followers brokers. All producers must connect to the leader in order to publish messages, but consumers may fetch from either the leader or one of the followers.

![][kafka-chapter1-7.jpeg]

**MirrorMaker**:: used for replicating data to other clusters in a multi-cluster setting. The replication mechanisms within the Kafka clusters are designed only to work within a single cluster, not between multiple clusters. The MirrorMaker tool helps to fulfil this requirement

[kafka-chapter1-1.jpeg]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/kafka/kafka-chapter1-1.jpeg
[kafka-chapter1-2.jpeg]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/kafka/kafka-chapter1-2.jpeg
[kafka-chapter1-3.jpeg]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/kafka/kafka-chapter1-3.jpeg
[kafka-chapter1-4.jpeg]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/kafka/kafka-chapter1-4.jpeg
[kafka-chapter1-6.jpeg]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/kafka/kafka-chapter1-6.jpeg
[kafka-chapter1-7.jpeg]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/kafka/kafka-chapter1-7.jpeg
[kafka-chapter4-4.jpeg]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/kafka/kafka-chapter4-4.jpeg

