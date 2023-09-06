---
layout: post
title: "[Kafka Guide] Chapter 4 Kafka Consumer - More on Parallelism"
date: 2023-09-02 08:00:00
categories: blog1
tags: "reading_notes Kafka"
toc: true
---

### Parallelim in Message Consuming

#### Single-threaded model

Kafka consumer is not thread safe. Multi-threaded access must be properly synchronized, which can be tricky. This is why the single-threaded model is commonly used. The code snippet shows how should we use a simple loop to fetch and consume data in a single thread. We shall take a note that by default `enable.auto.commit` is set to `true`, which means Kafka consumer will [automatically commit the offset](/blog1/2023/08/30/kafka-notes-chapter4.html#automatic-commit). 

```java
while (true) {
    ConsumerRecords records = consumer.poll(Duration.ofMillis(100000));
    // handle fetched records
}
```

![][kafka-consumer-1]

Processing message in a single thread sequencial seems not effcient, how about use a multi-threaded approach? 

💡 What are the problems of processing each message in a separate thread taken from a thread poll?

- Offset might be committed before a record is processed - violates at-least-once delivery semantics.
- Offset might not be commited after a record is processed during rebalancing process - violates the 
- Message processing order can't be guaranteed since messages from the same partition could be processed in parallel - violates the processing order guarantees per partition.



### The Simple Multi-Threaded Consumer Demo

Though the simple multi-threaded consumer demo proposed in this [blog]() is not implemented rigously and well tested, I found it is an exellent example to study to understand the basic of Kafka Consumers. Here I summarised some study notes



### The Confluent Parallel-Consumer Library

To fully realize the parallelsim to scale the Kafka consumer applications, the parallel-consumer client library is a good tool. It enables the client application to build on the parallelism at key-level (in the case the order of message at key-level is required only), or message-level (in the case the maintaing the order of the message is not strictly required). Even partition-level parallelism, using the parallel-consumer client is more resource efficient because the multiple instances of Kafka consumer using the traditional Kafka consumer client can be reduced to a single instance with multiple threads (this is the same goal the above Simple Multi-Threaded Consumer Demo wanted to achieve).



### Reference
- [Multi-Threaded Message Consumption with the Apache Kafka Consumer](https://www.confluent.io/blog/kafka-consumer-multi-threaded-messaging/)
- [simple multi-threaded consumer demo github](https://github.com/inovatrend/mtc-demo)
- [Introducing the Confluent Parallel Consumer](https://www.confluent.io/blog/introducing-confluent-parallel-message-processing-client/)
- [parallel-consumer github](https://github.com/confluentinc/parallel-consumer)