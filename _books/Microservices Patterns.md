---
layout: post
tag: reading_status/reading
category: tech
author: Chris Richardson
cover: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/books/Microservices_Patterns.jpg
---
# Fundamentals

## Monolith Hell

![[microservices_patterns_monolith_hell.excalidraw|800]]

## Scale cube

![[microservices_patterns_scale_cube.excalidraw|600]]

## SOA vs Microservices

I doubled the below table...

|                             | SOA                                                                                                               | Microservices                                                                                                                 |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Inter-service communication | Smart pipes, such as Enterprise Service bus, using heavyweight protocols, such as SOAP and the other WS standards | Dumb pipes, such as message broker, or direct service-to-service communication, using lightweight protocols such REST or gRPC |
| Data                        | Global data model and shared databases                                                                            | Data model and database per service                                                                                           |
| Typical service             | Large monolithic application                                                                                      | Smaller service                                                                                                                              |

## Patterns !!

A common used pattern structure includes three especially valuable sections:
- Forces: The issues that you must address when solving a problem
- Resulting context: The consequences of applying a pattern
	- Benefits
	- Drawbacks
	- Issues
- Related patterns: the five different types of relationships
	- predecessor: a pattern that motivates the need for this pattern
	- successor: a pattern that solves an issue that has been introduced by this pattern
	- alternative: a pattern that provides an alternative solution to this pattern
	- generalisation: a pattern that is a general solution to a problem
	- specialisation: a specialised form of a particular pattern

<div style="width: 960px; height: 640px; margin: 10px; position: relative;"><iframe allowfullscreen frameborder="0" style="width:960px; height:640px" src="https://lucid.app/documents/embedded/a1ba9c00-fb28-4aec-8e8b-e85bfc1d0102" id=".dRW6dUzun-n"></iframe></div>

![[microservices_patterns_discovery1.excalidraw]]

# Decomposition Strategies

> How to use ideas from DDD to eliminate god classes, which are classes that are used throughout an application and cause tangled dependencies that prevent decomposition.

