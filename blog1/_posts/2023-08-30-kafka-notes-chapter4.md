---
layout: post
title:  "[Kafka Guide] Chapter 4 Kafka Consumer"
date:   2023-08-30 08:00:00
categories: blog1
tags: "reading_notes Kafka"
toc: true
---

### Kafka Consumer Concepts

##### Consumers and Consumer Groups

The main way we scale data consumption from a Kafka topic is by adding more consumers to a consumer group - adding consumers in a consumer groups scales up the process, however adding more consumers (in a group) than the number of partitions does not help since some consumers just become idle - **a partition can only be consumed by one consumer in a group**. Adding consumer group allows separate processing of the topic for new use cases (independent from the other consumer groups).

![][kafka-chapter4-1]

💡 How should we make use of Kafka consumer and Kafka consumer group?

You create new consumer group for each application that needs all the messages from one or more topics. You add consumers to an existing consumer group to scale the reading and processing of messages from the topics, so each additional consumer in a group will only get a subset of the messages.

##### Consumer Groups and Partition Rebalance

💡 What is Partition Rebalance?

Moving partition ownership from one consumer to another is called a rebalance

💡 When will Partition Rebalance happen?

It happens when new consumers are added or old consumers are removed/crashed or administrator adds new partitions etc.

💡 What are the two types of Partition Rebalance strategies?

- **Eager rebalances**: during an eager rebalance, all consumers stop consuming, give up their ownership of all partitions, rejoin the consumer group, and get a brand-new partition assignment
- **Cooperative rebalances (incremental rebalances)**: typically involve reassigning only a small subset of the partitions from one consumer to another, and allowing consumers to continue processing records from all the partitions that are not reassigned

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

### Creating a Kafka Consumer

All you need is server URI, key and value deserializers

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

Thread Safety: one consumer per thread is the rule. To run multiple consumers in the same group in one application, you will need to run each in its own thread. To achieve multi-threaded message consumption with the Kafka Consumer, there're some tricks to be played, see [Example of Multi-threaded Message Consumption]()

### Configuring Consumers

- `fetch.min.bytes`: specify the minimum amount of data that the consumer wants to receive from the broker when fetching records, by default one byte.
- `fetch.max.wait.ms`: tell Kafka to wait until it has enough data to send before responding to the consumer, by default is 500 ms. 

> 💡 If you set fetch `max.wait.ms` to 100 ms and `fetch.min.bytes` to 1 Mb, how will Kafka response to the fetch request from consumer?
>
> Kafka will receive a fetch request from the consumer and will response with data either when it has 1 MB of data to return or after 100 ms, whichever happens first. 

- `fetch.max.bytes`: specify the maximum bytes that Kafka will return whenever the consumer polls a broker, 50 MB by default. 
- `max.poll.record`: controls the maximum **number of records** that a single call to `poll()` will return. 
- `max.partition.fetch.bytes`: controls the maximum number of bytes the server will return **per partition**, 1 MB by default. `fetch.max.bytes` is preferable since you have no control over how many partitions will be included in the broker response. 

---

- `session.timeout.ms` and `heartbeat.interval.ms`: The amount of time a consumer can be out of contact with the brokers while still considered alive defaults to 10 s. This property is closely related to `heartbeat.interval.ms`, which controls how frequently the Kafka consumer will send a heartbeat to the group coordinator, whereas `session.timeout.ms` controls how long a consumer can go without sending a heartbeat. Therefore, the two properties are typically modified together - `heartbeat.interval.ms` must be lower than `session.timeout.ms` and is usually set to one-third of the timeout value.
- `max.poll.interval.ms`: set the length of time during which the consumer can go without polling before it is considered dead. Since the heartbeat is sent in a background thread, there is a possibility that the main thread consuming from Kafka is deadlocked. Since the intervals between requests is difficult to predict, this property is set a large enough value as a fail-safe or backstop, default value is 5 minutes. 
- `default.api.timeout.ms`: the timeout that will apply to (almost) all API calls made by the consumer when you don't specify an explicit timeout while calling the API, default is 1 mins.
- `request.timeout.ms`: maximum amount of time the consumer will wait for a response from the broker. If the broker does not respond within this time, the client will assume the broker will not respond at all, close the connection, and attempt to reconnect, default is 30 s.

---

- `auto.offset.reset`: controls the behaviour of the consumer when it starts reading a partition for which it doesn't have a committed offset, or if the committed offset it has is invalid. The default is "latest", which means that lacking a valid offset, the consumer will start reading from the newest records (records that were written after the consumer started running). The alternative is "earliest". Or "none" which will cause an exception to be thrown when attempting to consume from an invalid offset.
- `enable.auto.commit`: controls whether the consumer will commit offsets automatically, and defaults to true. 
- `partition.assignment.strategy`: by default, Kafka has these strategies: `Range`, `RoundRobin`, `Sticky`, `Cooperative Sticky`. The default is `Range`. You can implement your own and the property should point to the name of your class.
- `client.id`:  used by the brokers to identify requests sent from the client, used in logging and metrics, for for quotas.
- `client.rack`: to enable fetching from the closest replica, you need to set the `client.rack` configuration and identify the zone in which the client is located. Then you can configure the brokers to replace the default `replica.selector.class` with `org.apache.kafka.commom.replica.Rack.AwareReplicaSelector`. 
- `group.instance.id`: any unique string and is used to provide a consumer with static group membership
- `receive.buffer.bytes` and `send.buffer.bytes`: sizes of the TCP send and receive buffers used by the sockets when writing and reading data. 
- `offsets.retention.minutes`: this is a broker configuration. As long as a consumer group has active members, the last offset committed by the group for each partition will be retained by Kafka, so it can be retrieved in case of reassignment or restart. However, once a group becomes empty, Kafka will only retain its committed offsets to the duration set by this configuration, by default 7 days.

### Commits and Offsets

One of Kafka's unique characteristic is that it does not track acknowledgements from consumers the way many JMS queues do. Instead, it allows consumers to use Kafka to track their position (offset) in each partition. We call the action of updating the current position in the partition an **offset commit**. Unlike traditional message queues, Kafka does not commit records individually. Instead, consumers commit the last message they've successfully processed from a partition and implicitly assume that every message before the last was also successfully processed. 

💡 For Kafka consumer, which case there will be duplicated processing?

During a rebalance, a consumer is assigned a new set of partitions. If the committed offset of the partition is smaller than the offset of the last message the client processed, the messages between the last processed offset and the committed offset will be processed twice

💡 For Kafka consumer, which case there will be missing data?

Same condition as above, if the committed offset of the partition is larger than the offset of the last message the client processed, the messages between these two offsets will be missing.

##### Automatic Commit

`enable.auto.commit=true` - it is critical to always process all the events returned by `poll()` before calling `poll()` again because the next `poll()` will commit the last offset returned by the previous `poll()` regardless if they are fully processed. This is a convenient approach but it does not give developers enough control to avoid duplicate messages.

##### Commit Current Offset

The simplest and most reliable of the commit APIs is `commitSync()`. This API will commit the latest offset returned by `poll()` and return once the offset is committed, throwing an exception if the commit fails for some reason. Noted that `commitSync()` will commit the latest offset returned by `poll()`.

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
			System.out.printf(...); // just do something with the record
		}
		consumer.commitAysnc(); // it is ok to request and forget as next loop will serve as a retry
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

### Rebalance Listeners

The Consumer API allows you to run your own code when partitions are added or removed, by passing a `ConsumerRebalanceListener` when calling the `subscribe()` method. You can implement three methods
- `public void onPartitionsAssigned(Collection<TopicPartition> partitions)`: called after partitions have been reassigned to the consumer but before the consumer starts consuming messages
- `public void onPartitionsRevoked(Collection<TopicPartition> partitions)`: called when the consumer has to give up partitions that it previously owned - either as a result of a rebalance or when the consumer is being closed.
- `public void onPartitionsLost(Collection<TopicPartition> partitions)`: called when a cooperative rebalancing algorithm is used, and only in exceptional cases where the partitions were assigned to other consumers without first being revoked by the rebalance algorithm.

💡 Why we need to be aware of the consumer exiting or partition rebalancing?

If you know your consumer is about to lose ownership of a partition, you will want to commit offsets of the last event you've processed. Perhaps you also need to close file handles, database connections and such.

### Consuming with Specific Offsets

- `seekToBeginning(Collection<TopicPartition> tp)`: start from the beginning of the partition
- `seekToEnd(Collection<TopicPartition> tp)`: start from the end - consuming only new messages
- `seek(TopicPartition tp, OffsetAndTimestamp offset)`: reset the offset on the partition

### How to Exit Gracefully

You will need another thread to call `consumer.wakeup()` (the only consumer method that is safe to call from a different thread). Calling `wakeup()` will cause `poll()` to exit with `WakeupException`. 

![][kafka-chapter4-exit]


[kafka-chapter4-1]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/kafka/kafka-chapter4-1.png
[kafka-chapter4-exit]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/kafka/kafka-chapter4-exit.png