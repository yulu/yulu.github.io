---
layout: post
title:  "[Kafka Guide] Chapter 3 Kafka Producer"
date:   2023-07-31 19:00:00
categories: blog1
tags: "reading_notes Kafka"
---

### Kafka Producer Components illustrated

![][kafka-producer-components.png]


### Basic Setup

```java
Properties kafkaProps = new Properties(); // <= start with a property object
kafkaProps.put("bootstrap.servers", "broker1:9092,broker2:9092"); // <= server uri

kafkaProps.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer"); // <= use default serializer
kafkaProps.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

producer = new KafkaProducer<String, String>(kafkaProps);
```

### Sending messages

>Three primary methods of sending messages
>- fire-and-forget: Send and do not wait for response
>- synchronous send: use `Future` object and `get()` to wait on the Future and see if the `send()` was successful or not before sending the next record
>- asynchronous send: A producer object can be used by multiple threads to send messages. Product object is thread-safe

##### The simplest way (fire-and-forget)
```java
ProducerRecord<String, String> record = 
	new ProducerRecord<>("CustomerCountry", "Precision Products", "France"); // <= there're different constructors, here we use a simple one requires: topic name, key and value
	
try {
	producer.send(record); // this returns a future object with RecordMetadata, but we ignore it
} catch (Exception e) {
	e.printStackTrace(); // exceptions before msg is sent can be captured e.g. SerializationException, BufferExhaustedException and InterruptException
}
```

##### Synchronous send
```java
ProducerRecord<String, String> record = 
	new ProducerRecord<>("CustomerCountry", "Precision Products", "France"); 
	
try {
	producer.send(record).get(); // <= use future.get() to wait for the reply
} catch (Exception e) {
	e.printStackTrace(); // <= if there's any errors before or while sending to Kafka
}
```

##### Asynchronous send with a callback
```java
private class DemoProducerCallback implements Callback { // <= need to implements org.apacke.kafka.clients.producer.callback
	@Override
	public void onCompletion(RecordMetadata recordMetadata, Exception e) {
		if (e != null) {
			e.printStackTrace(); // <= if kafka returns an error, onCompletion will have a nonnull exception
		}
	}
}

ProducerRecord<String, String> record = 
	new ProducerRecord<>("CustomerCountry", "Precision Products", "France"); 
producer.send(record, new DemoProducerCallback()); // <= we pass a Callback object along when sending the record, callback is executed in the main thread, so it should be reasonably fast
```

### Configurations

##### Core configurations
- `client.id`: logical identifier for the client and the application it is used in.
- `acks`: controls how many partition replicas must receive the record before the producer can consider the write successful. 

> You will see that with lower and less reliable `acks` configuration, the producer will be able to send records faster. This means that you trade off reliability for producer latency. However, end-to-end latency is measured from the time a record was produced until it is available for consumers to read and is identical for all three options. The reason is that, in order to maintain consistency, Kafka will not allow consumers to read records until they are written to all in sync replicas. **Therefore, if you care about end-to-end latency, rather than just the producer latency, there is no trade-off to make: you will get the same end-to-end latency if you choose the most reliable option.

---

##### Message Delivery Time

![][kafka-producer-delivery-time.png]

- `max.block.ms`: how long the producer may block when calling `send()` and when explicitly requesting metadata via `partitionsFor()`
- `delivery.timeout.ms`: limit the amount of time spent from the point a record is ready for sending until either the broker responds or the client gives up, including time spent on retries, **use this one and leave the retry settings as default**
- `request.timeout.ms`: controls how long the producer will wait for a reply from the server when sending data
- `retries` and `retry.backoff.ms`: **not recommended to use**
- `linger.ms`: controls the amount of time to wait for additional messages before sending the current batch. 

---

##### Others
- `buffer.memory`: sets the amount of memory the producer will use to buffer messages waiting to be sent to brokers.
- `compression.type`: e.g. snappy, gzip, lz4, zstd
- `batch.size`: controls the amount of memory in bytes that will be used for each batch (when multiple records are sent to the same partition, the producer will batch them together)
- `max.in.flight.requests.per.connection`: controls how many message batches the producer will send to the server without receiving response
- `max.request.size`: controls the size of a produce request sent by the producer
- `receive.buffer.bytes` and `send.buffer.bytes`
- `enable.idempotence`: when idempotent producer is enabled, the producer will attach a sequence number to each record it sends. If the broker receives records with the same sequence number, it will reject the second copy and the producer will receive the harmless `DuplicateSequenceException`

### Serializers
Data serialization strategies detail can be ref to [DDIA-Chapter4 encoding (serialisation mechanism)](/blog1/2022/09/18/ddia-4.html)

**Schema Regsitry** Pattern is used: the idea is to store all the schemas used to write data to Kafka in the registry. Then we simply store the identifier for the schema in the record we produce to Kafka. The consumers can then use the identifier to pull the record out of the Schema Registry and deserialize the data. The key is that all this work is done in the serializers and deserializers:

![][kafka-chapter2-1.jpeg]

Here is an example of how to produce generated Avro objects to Kafka
```java
Properties props = new Properties();

props.put("boostrap.servers", "localhost:9092");
props.put("key.serializer", "io.confluent.kafka.serializers.KafkaAvroSerializer"); // <= use kafkaAvroSerializer to serialize our objects with Avro
props.put("value.serializer", "io.confluent.kafka.serializers.kafkaAvroSerializer");
props.put("schema.registry.url", schemaUrl);

String topic = "customerContacts";

Producer<String, Customer> producer = new KafkaProducer<>(props);

// We keep producing new events until someone ctrl-c
while (true) {
	Customer customer = CustomerGenerator.getNext();
	System.out.println("Generated customer " + customer.toString());
	ProducerRecord<String, Customer> record = new ProducerRecord<>(topic, customer.getName(), customer);
	producer.send(record);
}
```

### Partitioners

The importance of keys: all messages with the same key will go to the same partition (for the same topic).

- When the key is `null` and the default partitioner is used, the record will be sent to one of the available partitions of the topic at random. A round-robin algorithm will be used to balance the messages among the partitions. 
- If a key exists and the default partitioner is used, Kafka will hash the key and use the result to map the message to a specific partition. 
- `RoundRobinPartitioner` and `UniformStickyPartitioner` can be used to replace the default partitioner.

You can implement custom partitioning strategy, e.g. code example below
```java
public class BananaPartitioner implements Partitioner {
	public void configure(Map<String, ?> configs) {}
	
	public int partition(String topic, Object key, byte[] keyBytes,
						 Object value, byte[] valueBytes,
						 Cluster cluster) {
		List<PartitionInfo> partitions = cluster.partitionsForTopic(topic);
		int numPartitions = partitions.size();

		if ((keyBytes == null) || (!(key instanceOf String)))
			throw new InvalidRecordException("We expect all messages to have customer name as key");
		
		if (((String)) key).equals("Banana");
			return numPartitions - 1; // Banana will always go to last partition

		// Other records will get hashed to the rest of the partitions
		return Math.abs(Utils.murmur2(keyBytes)) % (numPartitions - 1)
	}

	public void close() {}
}
```

### Headers, Interceptors, Quotas and Throttling

##### Headers

Additional metadata information about Kafka record, e.g.indicate the source of data, information for routing or tracing)

##### Interceptors

Capturing monitoring and tracing information, enhancing the message with standard headers, redacting sensitive information. Example code snippet
```java
public class CountingProducerInterceptor implements ProducerInterceptor {
	ScheduledExecutorService executorService = 
		Executors.newSingleThreadScheduledExecutor();
	static AtomicLong numSent = new AtomicLong(0);
	static AtomicLong numAcked = new AtomicLong(0);

	public void configure(Map<String, ?> map) {
		Long windowSize = Long.valueOf(
			(String) map.get("counting.interceptor.window.size.ms"));
		executorService.scheduleAtFixedRate(CountingProducerInterceptor::run, windowSize, windowSize, TimeUnit.MILLISECONDS);
	}

	public ProducerRecord onSend(ProducerRecord producerRecord) {
		numSent.incrementAndGet();
		return producerRecord;
	}

	public void onAcknowledgement(RecordMetadata recordMetadata, Exception e) {
		numAcked.incrementAndGet();
	}

	public void close() {
		executorService.shutdownNow();
	}

	public static void run() {
		// just print out the sent and ack counts in a separate thread
		// reset the counts in each time window
		System.out.println(numSent.getAndSet(0));
		System.out.println(numAcked.getAndSet(0));
	}
}
```

Producer interceptors can be applied without any changes to the client code (need to have deployment config changes). To use the preceding interceptor:
1. Add your jar to the classpath
```
export CLASSPATH=$CLASSPATH:~./target/CountProducerInterceptor-1.0-SNAHPSHOT.jar
```

2. Create a config file (producer.config) that includes:
```
interceptor.classes=com.shapira.examples.interceptors.CountProducerInterceptor counting.interceptor.window.size.ms=100000
```

3. Run the application as you normally would but make sure include the configuration that you created 
```
bin/kafka-console-producer.sh --broker-list localhost:9092 --topic interceptor-test --producer.config producer.config
```

##### Quotas and Throttling

```
quota.producer.default=2M
quota.producer.override="clientA:4M,clientB:10M"
```

### Summary as Ankicard

💡 What are the three ways to send message from producer to Kafka broker?  

- send-and-forget: producer.send(record);
- synchronous send: producer.send(record).get(); // <= use future.get() to wait for the reply
- asynchronous send: producer.send(record, new DemoProducerCallback());

💡 Can a **producer** object be used by multiple threads to send messages in Kafka producer application? 

Yes, product object is thread-safe

💡 What is the recommended Kafka producer timeout and retry configuration, and why?  

Configure the `delivery.timeout.ms` and leave the retries config as default. The `delivery.timeout.ms`` includes the time when record is ready to be sent to the response is received from the broker, including the retries. In this case we limit the total preparation + in-flight time and let the producer retries as many times as possible within the limited timeout constraint. 

💡 What are the five steps in the send() process in the Kafka producer?  

send() → batching → await send → retries → inflight

💡 Which component in the Kafka producer is responsible for the serialization and how to config?  

Serializer. `props.put("value.serializer", "io.confluent.kafka.serializers.kafkaAvroSerializer");`

💡 What are the commonly used serialization strategies in Kafka producer?  

Avro, protobuff, json

💡 The key in the message is used to select the partition. If a key is null, what strategy will be used to select the partition?  

A round-robin strategy will be used to select the partition

💡 What some ready-to-use partitioner to replace the default partitioner?  

`RoundRobinPartitioner` and `UniformStickyPartitioner`

💡 How can you write your own partitioner?  

Implement the 'Partitioner' interface

💡 How can we add more metadata information in the message in Kafka producer?  

Use header

💡 How can we limit the Kafka producer quota?  

```
quota.producer.default=2M
quota.producer.override="clientA:4M,clientB:10M"
```

[kafka-producer-components.png]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/kafka/kafka-producer-components.png
[kafka-producer-delivery-time.png]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/kafka/kafka-producer-delivery-time.png
[kafka-chapter2-1.jpeg]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/kafka/kafka-chapter2-1.jpeg