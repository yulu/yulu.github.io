---
layout: post
tag: reading_status/reading
category: tech
author: Eric Evans
cover: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/books/Domain_Driven_Design.jpg
---

![[ddd-xp-vs-waterfall.excalidraw.png|800]]

XP works best for developers with a sharp design sense - The XP process assumes you can improve a design by refactoring, and that you will do this often and rapidly

# Part I Putting the Domain Model to Work
> Presents the basic goals of DDD, motivate the practices in later chapters

What is a model?
- A model is a selectively simplified and consciously structured form of knowledge.
- it is not a "Diagram"! A diagram can represent and communicate a model, as can carefully written code, as can an English sentence.
![[ddd_model_form.excalidraw]]

Three basics uses determine the model
- The model is distilled knowledge - [[Domain Driven Design#knowledge crunching]]
- The model is the backbone of a language used by all team members including non-developers - [[Domain Driven Design#Ubiquitous language]]
- model and the heart of the design shape each other - the code can be interpreted based on understanding the model - [[Domain Driven Design#implementation binding]]

## knowledge crunching

Knowledge crunching is typically led by developers. Sources to utilise for knowledge crunching
- minds of domain exports - PMs  
- users of existing systems - PMs and QA
- prior experience of the technical team - veteran Devs
- another project in the same domain - reference to other team's software

> [!important] The issue of feature-driven development
> In some case, developers get the experts to describe a desired feature and then they go build it. They show the experts the result and ask what to do next. If the programmers practice refactoring, they can keep the software clean enough to continue extending it, but if programmers are not interested in the domain, they learn only what the application should do, not the principles behind it. Useful software can be built that way, but the project will never arrive at a point where powerful new features unfold as corollaries to older features.
> 


## Ubiquitous language

### About core developers

Why we need ubiquitous language between tech and non-tech, let's look at the how core developers facilitate the communication and what's the drawback of that


![[ddd_ubiquitous_language.excalidraw.png|800]]

core developers becomes the bottlenecks of information flow
- domain exports and technical members are using different languages, only the ones who understand both help to crunch the knowledge and translate
- the most incisive expression of the domain often emerge in a **transient** form that is never captured in the code or even in written docs!

>[!important] Transient!
> If you've ever write something as `@transient` in java, you know that this marks a member variable not to be serialised when it is persisted to the streams of bytes. Similar to the domain knowledge, if the knowledge is not in code (explicitly), they are transient

### How much documentation should be in place

UML diagram or other code-generated documents (e.g. ER diagram of MySQL) are useful, but sometimes they can be counterproductive because too much details are delivered! Diagrams are a means of communication and explanation, and they facilitate brainstorming. They serve these ends best if they are minimal. So as the code - we know code explains everything but we can't afford to read every single lines of code to understand how the software behaves. And developers are not the only people who need to understand the software behaviour, so as PM and QA and other non-tech biz parties.

> [!important] So what the written documentation should do
> - explain the concepts of models
> - help in navigating the details of code - but it shouldn't try to do what the code already does
> - give some insight into the model's intended style of use

> [!warning] Non-important documents
> Document does not seem relevant to people or does not seem important enough to update, let active it could create confusion and hurt the project. And if a document isn't playing an important role, keeping it up to date through sheerwill and discipline wastes effort.


## Implementation binding





# Pat II The Building Blocks of Model-Driven Design
> Best practices and Patterns

## Isolating the Domain

### Layered Architecture

How domains should be fit into the layered architecture (see details about architecture patterns [[Software Architecture Patterns]])

![[ddd_layered_architecture.excalidraw.png|800]]

> [!important] MVC
> The grandfather of patterns for connecting the UI to the application and domain layers is MODEL-VIEW-CONTROLLER (MVC). It was pioneered in the Smalltalk world back in the 1970s and has inspired many of the UI architectures that followed.

### Conflict of DDD layered architecture and Smart UI (micro-frontend)

Smart UI in the context is more like small scale single-page-application (biz logic can be contained in the page) for me. The DDD book was written in 2003, before we have AJAX since 2006, way before we start to talk about micro-frontend. So I will shift the topic to layered (horizontal sliced) architecture  vs micro-service (vertically sliced) architecture, and how we could make better use of them.



# Pat III Refactoring Towards Deeper Insight
> Discovery process: Valuable models do not emerge immediately; they require a deep understanding of the domain That understanding comes from diving in, implementing an initial design based on a probably naive model, and then transforming it again and again.



# Part IV Strategic Design
> How to handle large-scale problem (complex systems, larger organizations, interactions with external systems and legacy systems)



