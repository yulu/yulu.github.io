---
layout: post
tag: reading_status/reading
cover: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/books/Learning_Domain-Driven_Design.jpg
category: tech
author: Vlad Khononov
---
# Learning Domain-Driven Design

![rw-book-cover](https://m.media-amazon.com/images/I/81WJbw5XJbL._SY160.jpg)

## Metadata
- Author: [[Vlad Khononov]]
- Full Title: Learning Domain-Driven Design
- Category: #books

## Highlights
 >[!note]
“Oh, business logic is all the loops and ‘if-else’ statements you need in order to implement the requirements.”  ([Location 97](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=97))

 >[!note]
the most complex systems are inherently simple when viewed from the right angle.  ([Location 115](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=115))

 >[!note]
its core, supporting, and generic subdomains.  ([Location 348](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=348))

 >[!note]
During the traditional software development lifecycle, the domain knowledge is “translated” into an engineer-friendly form known as an analysis model, which is a description of the system’s requirements rather than an understanding of the business domain behind it. While the intentions may be good, such mediation is hazardous to knowledge sharing.  ([Location 865](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=865))

 >[!note]
In its essence, a model is an abstraction. The notion of abstraction allows us to handle complexity by omitting unnecessary details and leaving only what’s needed for solving the problem at hand. On the other hand, an ineffective abstraction removes necessary information or produces noise by leaving what’s not required.  ([Location 973](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=973))

 >[!note]
For example, a wiki can be used as a glossary to capture and document the ubiquitous language.  ([Location 1012](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=1012))

 >[!note]
Automated tests written in the Gherkin language are not only great tools for capturing the ubiquitous language but also act as an additional tool for bridging the gap between domain experts and software engineers.  ([Location 1024](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=1024))

 >[!note]
“Individuals and interactions over processes and tools.”  ([Location 1044](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=1044))

 >[!note]
As we discussed in the previous chapter, a model is not a copy of the real world but a construct that helps us make sense of a complex system.  ([Location 1181](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=1181))

 >[!note]
striving for small bounded contexts can backfire too. The smaller they are, the more integration overhead the design induces.  ([Location 1215](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=1215))

 >[!note]
Anticorruption layer The consumer translates the service provider’s model into a model that fits the consumer’s needs.  ([Location 1711](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=1711))
**I like this one**

## New highlights added January 27, 2023 at 8:41 AM
 >[!note]
That said, the distinctive feature of an active record object is the separation of data structures and behavior (business logic).  ([Location 2094](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=2094))

 >[!note]
Usually, an active record’s fields have public getters and setters that allow external procedures to modify its state.  ([Location 2095](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=2095))

 >[!note]
In other words, this pattern allows the code to “speak” the ubiquitous language and to follow the domain experts’ mental models.  ([Location 2252](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=2252))

 >[!note]
Value objects shine brightest when they centralize the business logic that manipulates the values.  ([Location 2394](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=2394))

 >[!note]
The reason “entity” was omitted is because we don’t implement entities independently, but only in the context of the aggregate pattern.  ([Location 2680](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=2680))

 >[!note]
Ironically, the projects that can benefit from DDD the most are the brownfield projects: those that already proved their business viability and need a shake-up to fight accumulated technical debt and design entropy.  ([Location 6644](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=6644))

 >[!note]
Another powerful yet unfortunate heuristic for core subdomains is identifying the worst-designed software components—those big balls of mud that all engineers hate but the business is unwilling to rewrite from scratch because of the accompanying business risk. The key here is that the legacy system cannot be replaced with a ready-made system—it would be a generic subdomain—and any modification to it entails business risks.  ([Location 6677](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=6677))

 >[!note]
Multiple teams working on the same high-level component Duplicate implementations of core subdomains Implementation of a core subdomain by an outsourced company  ([Location 6715](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=6715))

 >[!note]
Friction because of frequently failing integration  ([Location 6717](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=6717))

 >[!note]
Awkward models spreading from external services and legacy systems  ([Location 6718](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=6718))

 >[!note]
are rarely successful.  ([Location 6732](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=6732))

 >[!note]
rename  ([Location 6749](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=6749))
**The power of rename!!!**

## New highlights added March 9, 2023 at 2:10 PM
 >[!note]
must trigger integration tests for all the affected bounded contexts.  ([Location 1515](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=1515))

 >[!note]
shared kernel will naturally be applied for the subdomains that change the most: the core subdomains.  ([Location 1525](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=1525))

 >[!note]
From a modeling perspective, the translation of the supplier’s model isolates the downstream consumer from foreign concepts that are not relevant to its bounded context. Hence, it simplifies the consumer’s ubiquitous language and model.  ([Location 1599](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=1599))

 >[!note]
Separate ways  ([Location 1723](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=1723))

 >[!note]
B and C  ([Location 1726](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=1726))

 >[!note]
A and B  ([Location 1729](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=1729))

 >[!note]
Shared kernel.  ([Location 1732](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=1732))

 >[!note]
Lacking strict organization in implementation concerns makes the codebase hard to change. When the business logic has to change, it may not be evident what parts of the codebase have to be affected by the change. The change may have unexpected effects on seemingly unrelated parts of the system. Conversely, it may be easy to miss code that has to be modified. All of these issues dramatically increase the cost of maintaining the codebase.  ([Location 4300](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=4300))

 >[!note]
The dependency between the business logic and the data access layers makes this architectural pattern a good fit for a system with its business logic implemented using the transaction script or active record pattern.  ([Location 4556](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=4556))

 >[!note]
the downstream bounded context can adapt the upstream bounded context’s model to its needs using an anticorruption layer (ACL), while the upstream bounded context can act as an open-host service (OHS) and protect its consumers from changes to its implementation model by using an integration-specific published language.  ([Location 4924](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=4924))

## New highlights added April 30, 2023 at 3:11 PM
 >[!note]
In some use cases, you can avoid implementing a custom solution for a stateful translation by using off-the-shelf products; for example, a stream-process platform (Kafka, AWS Kinesis, etc.), or a batching solution (Apache NiFi, AWS Glue, Spark, etc.).  ([Location 5003](https://readwise.io/to_kindle?action=open&asin=B09J2CMJZY&location=5003))

