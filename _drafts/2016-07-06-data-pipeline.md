---
layout: post
title:  "Stacks for Big Data"
date:   2016-07-01 18:00:00
categories: blog1
tags: "big-data architecture"
---

## Kafka

[Kalfa](http://kafka.apache.org/) is a messaging system, similar to traditional messaging systems like RabbitMQ, ActiveMQ, MQSeries, but it's ideal for log aggregation, persistent messaging, fast reads and writes and can accommodate numerous clients.

Install using homebrew:

{% highlight shell %}
brew install kafka
{% endhighlight %}

Kafka require zookeeper to set setup. Start Zookeeper first with the provided configuration in Kafka config directory.

{% highlight shell %}
/usr/local/Cellar/kafka/0.10.0.0/libexec/bin/zookeeper-server-start.sh /usr/local/etc/kafka/zookeeper.properties
{% endhighlight %}

Then start the Kafka server

{% highlight shell %}
/usr/local/Cellar/kafka/0.10.0.0/libexec/bin/kafka-server-start.sh /usr/local/etc/kafka/server.properties
{% endhighlight %}

## Spark
