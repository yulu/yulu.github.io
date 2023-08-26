---
layout: post
title:  "[Kafka Guide] Chapter 4 Kafka Consumer"
date:   2023-07-31 19:00:00
categories: blog1
tags: "reading_notes Kafka"
toc: true
---

### Kafka Consumer Concepts

##### Consumers and Consumer Groups

The main way we scale data consumption from a Kafka topic is by adding more consumers to a consumer group - adding consumers in a consumer groups scales up the process, however adding more consumers (in a group) than the number of partitions does not help since some consumers just become idle - **a partition can only be consumed by one consumer in a group**. Adding consumer group allows separate processing of the topic for new use cases (independent from the other consumer groups).

![][kafka-chapter4-1.png]

💡 How should we make use of Kafka consumer and Kafka consumer group?

You create new consumer group for each application that needs all the messages from one or more topics. You add consumers to an existing consumer group to scale the reading and processing of messages from the topics, so each additional consumer in a group will only get a subset of the messages.

##### Consumer Groups and Partition Rebalance

💡 What is Partition Rebalance?

Moving partition ownership from one consumer to another is called a rebalance

💡 When will Partition Rebalance happen?

It happens when new consumers are added or old consumers are removed/crashed or administrator adds new partitions etc.

💡 What are the two types of Partition Rebalance strategies?

- *Eager rebalances*: during an eager rebalance, all consumers stop consuming, give up their ownership of all partitions, rejoin the consumer group, and get a brand-new partition assignment
- *Cooperative rebalances (incremental rebalances)*: typically involve reassigning only a small subset of the partitions from one consumer to another, and allowing consumers to continue processing records from all the partitions that are not reassigned

💡 How does consumer maintain membership in a consumer group and ownership of the assigned partition and make sure it is alive and known to the Kafka broker?

Consumers maintain membership and ownership by sending *heartbeats* to a Kafka broker designated as the *group coordinator*. The heartbeats are sent by a background thread of the consumer, and as long as the consumer is sending heartbeats at regular intervals, it is assumed to be alive. 

💡 How does the Process of Assigning Partitions to Consumer Work?

When a consumer wants to join a group, it sends a `JoinGroup` request to the group coordinator. The first consumer to join the group becomes the group leader. The leader receives a list of all consumers in the group from the group coordinator and is responsible for assigning a subset of partitions to each consumer. It uses an implementation of `PartitionAssignor` to decide which partitions should be handled by which consumer.
Kafka has a few build-in partition assignment polices. After deciding on the partition assignment, the consumer group leader sends the list of assignments to the `GroupCoordinator`, which sends this information to all the consumers.

> ❓ Questions to be explored
- Why the leader is responsible for the assignment strategy execution, but not the group coordinator? 
- Leader is a client (e.g. java runtime), what is exactly a "group coordinator"? 
- What is the Kafka broker's architecture? 
See more in Kafka Guide - Chapter 6 Kafka Internals later.

##### Static Group Membership

💡 What is static group membership?

The consumer is assigned a unique `group.instance.id` and it becomes a static member. The same partitions will be assigned to it when it rejoins the group.

💡 When static group membership is useful?

Static group membership is useful when your application maintains local state or cache that is populated by the partitions that are assigned to each consumer. When re-creating this cache is time-consuming, you don't want this process to happen every time a consumer restarts.

💡 What is the difference of the rebalance strategy for a consumer with static group membership from normal consumer?

When consumer with static group membership restart, it will not trigger a rebalance. `session.timeout.ms` is used to detected whether they are really gone and rebalance is required. So we should select a good `session.timeout.ms` config to make sure restart of the consumer is within a acceptable delay and the consumer can catch up after restart. 

### Creating a Kafka Consumer and Subscribing to Topics

All you need is server uri, key and value deserializers

```java
Properties props = new Properties();
props.put("bootstrap.servers", "broker1:9092,broder2:9092");
props.put("group.id", "CountryCounter");
props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

KafkaConsumer<String, String> consumer = new KafkaConsumer<String, String>(props);
```

Subscribing to Topics, we can use regular expression here, but need to pay attention to two issues
- the metadata size fetched by the client might be large since client do local matching (signifcant overhead)
- the client should be grant the `describe` permission on the entire cluster in order to describe all topics in the cluster (then do local matching)

```java
consumer.subscribe(Collections.singletonList("customerCountries"));

consumer.subscribe(Pattern.compile("test.*"));
```

### The Poll Loop

The heart of the Consumer API

```java
Duration timeout = Duration.ofMillis(100);

while (true) {
	ConsumerRecords<String, String> records = consumer.poll(timeout);

	for (ConsumerRecords<String, String> record: records) {
		System.out.printf("topic = %s, partition = %d, offset = %d, " + "customer = %s, country = %s\n",
				record.topic(), record.partition(), record.offset(), record.key(), record.value());
		int updatedCount = 1;
		if (custCountryMap.containsKey(record.value())) {
			updatedCount = custCountryMap.get(record.value()) + 1;
		}
		custCountryMap.put(record.value(), updatedCount);

		JSONObject json = new JSONObject(custCountryMap);
		System.out.println(json.toString());
	}
}
```

The `poll()` loop does a lot more than just get data. The first time you call `poll()` with a new consumer, it is responsible for finding the `GroupCoordinator`, joining the consumer group, and receiving a partition assignment. If a rebalance is triggered, it will be handled inside the poll loop as well, including related callbacks. 

Thread Safety: one consumer per thread is the rule. To run multiple consumers in the same group in one application, you will need to run each in its own thread. To achieve multi-threaded message consumption with the Kafka Consumer, there're some tricks to be played, see Kafka Guide - Chapter 4.1 Multi-threaded Message Consumption with Kafka Consumer

### Configuring Consumers

// todo

### Commits and Offsets

One of Kafka's unique characteristic is that it does not track acknowledgements from consumers the way many JMS queues do. Instead, it allows consumers to use Kafka to track their position (offset) in each partition. We call the action of updating the current position in the partition an **offset commit**. Unlike traditional message queues, Kafka does not commit records individually. Instead, consumers commit the last message they've successfully processed from a partition and implicitly assume that every message before the last was also successfully processed. 

💡 For Kafka consumer, which case there will be duplicated processing?

During a rebalance, a consumer is assigned a new set of partitions. If the committed offset of the partition is smaller than the offset of the last message the client processed, the messages between the last processed offset and the committed offset will be processed twice

💡 For Kafka consumer, which case there will be missing data?

Same condition as above, if the committed offset of the partition is larger than the offset of the last message the client processed, the messages between these two offsets will be missing.

##### Automatic Commit

`enable.auto.commit=true` - it is critical to always process all the events returned by `poll()` before calling `poll()` again because the next `poll()` will commit the last offset returned by the previous `poll()` regardless if they are fully processed. This is a convenient approach but it does not give developers enough control to avoid duplicate messages.

##### Commit Current Offset

The simplest and most reliable of the commit APIs is `commitSync()`. This API will commit the latest offset returned by `poll()` and return once the offset is committed, throwing an exception if hte commit fails for some reason. Noted that `commitSync()` will commit the latest offset returned by `poll()`.

##### Asynchronous Commit

Done by `commitAsync()`: we just send the request and continue without waiting for the response from the broker. `commitAsync()` gives you an option to pass in a callback that will be triggered when the broker responds. It is common to use the callback to log commit errors or to count them in a metric, **but if you want to use the callback for retries, you need to be aware of the problem with commit order <- use a monotonically increasing sequence number to track in this case**.

##### Combining Synchronous and Asynchronous commits

Before close the consumer or rebalance, we want to make extra sure that the commit succeeds. We can use a combination of sync and async commit to do this.

```java
Duration timeout = Duration.ofMillis(100);

try {
    while (!closing) {
        ConsumerRecords<String, String> records = consumer.poll(timeout);
        for (ConsumerRecord<String, String> record : records) {
            System.out.printf(...); // just do soemthing with the record
        }
        consumer.commitAsync(); // it is ok to request and forget as next loop will server as a retry
    }
    consumer.commitSync(); // it will block and retry until unrecoverable failure
} catch (Exception e) {
    log.error("unexpected error", e);
} finally {
    consumer.close();
}
```

##### Committing a Specified Offset

Give the `commitAsync()` or `commitSync()` a Map of partition and offset, it can commit specific offsets

```java
private Map<TopicParitition, OffsetAndMetadata> currentOffsets = new HashMap<>();

...
consumer.commitAsync(currentOffsets, null)
```

[kafka-chapter4-1.png]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/kafka/kafka-chapter4-1.png