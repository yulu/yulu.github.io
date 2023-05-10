---
layout: post
tag: reading_status/reading
category: tech
author: Robert C. Martin
cover: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/books/Clean_Architecture.jpg
---
# Clean Architecture

![rw-book-cover|150](https://images-na.ssl-images-amazon.com/images/I/51JF95r45vL._SL200_.jpg)

## Metadata
- Author: [[Robert C. Martin]]
- Full Title: Clean Architecture
- Category: #books

## Highlights
 >[!note]
The measure of design quality is simply the measure of the effort required to meet the needs of the customer. If that effort is low, and stays low throughout the lifetime of the system, the design is good. If that effort grows with each new release, the design is bad. It’s as simple as that.  ([Location 372](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=372))

 >[!note]
The difficulty in making such a change should be proportional only to the scope of the change, and not to the shape of the change.  ([Location 479](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=479))
**Define the "scope" and "shape"**

## New highlights added July 6, 2022 at 8:51 AM
 >[!note]
three big concerns of architecture: function, separation of components, and data management.  ([Location 593](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=593))

 >[!note]
certain uses of goto statements prevent modules from being decomposed recursively into smaller and smaller units, thereby preventing use of the divide-and-conquer approach necessary for reasonable proofs.  ([Location 621](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=621))

 >[!note]
proved that all programs can be constructed from just three structures: sequence, selection, and iteration.  ([Location 627](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=627))

 - *falsifiable*:: 可证伪 
 >[!note]
Software architects strive to define modules, components, and services that are easily falsifiable (testable). To do so, they employ restrictive disciplines similar to structured programming, albeit at a much higher level.  ([Location 694](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=694))

 >[!note]
The fact that OO languages provide safe and convenient polymorphism means that any source code dependency, no matter where it is, can be inverted.  ([Location 867](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=867))

 >[!note]
All race conditions, deadlock conditions, and concurrent update problems are due to mutable variables.  ([Location 941](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=941))

## New highlights added October 29, 2022 at 11:09 PM
 >[!note]
We use polymorphism as the mechanism to cross architectural boundaries; we use functional programming to impose discipline on the location of and access to data; and we use structured programming as the algorithmic foundation of our modules.  ([Location 591](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=591))

 >[!note]
Event sourcing is a strategy wherein we store the transactions, but not the state. When state is required, we simply apply all the transactions from the beginning of time.  ([Location 990](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=990))

 >[!note]
An active corollary to Conway’s law: The best structure for a software system is heavily influenced by the social structure of the organization that uses it so that each software module has one, and only one, reason to change.  ([Location 1037](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=1037))

 >[!note]
The gist is that for software systems to be easy to change, they must be designed to allow the behavior of those systems to be changed by adding new code, rather than changing existing code.  ([Location 1040](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=1040))

 >[!note]
A module should be responsible to one, and only one, user or stakeholder.  ([Location 1069](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=1069))

 >[!note]
A module should be responsible to one, and only one, actor.  ([Location 1074](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=1074))

 >[!note]
If component A should be protected from changes in component B, then component B should depend on component A.  ([Location 1186](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=1186))

 >[!note]
This goal is accomplished by partitioning the system into components, and arranging those components into a dependency hierarchy that protects higher-level components from changes in lower-level components.  ([Location 1217](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=1217))

 >[!note]
Components are the units of deployment.  ([Location 1412](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=1412))

 - *menagerie*:: 动物园 
 >[!note]
Therefore the release process must produce the appropriate notifications and release documentation so that users can make informed decisions about when and whether to integrate the new release.  ([Location 1536](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=1536))

 - *hodgepodge*:: 大杂烩 
 >[!note]
For most applications, maintainability is more important than reusability.  ([Location 1555](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=1555))

 >[!note]
It has more to do with the way that project is developed and used, than with what the project actually does.  ([Location 1611](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=1611))

 - *prowess.*
 - *pinnacle*
 >[!note]
The strategy behind that facilitation is to leave as many options open as possible, for as long as possible.  ([Location 1950](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=1950))

 >[!note]
There are many systems out there, with terrible architectures, that work just fine. Their troubles do not lie in their operation; rather, they occur in their deployment, maintenance, and ongoing development.  ([Location 1955](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=1955))

 >[!note]
a system being developed by five different teams, each of which includes seven developers, cannot make progress unless the system is divided into well-defined components with reliably stable interfaces. If no other factors are considered, the architecture of that system will likely evolve into five components—one for each team. Such a component-per-team architecture is not likely to be the best architecture for deployment, operation, and maintenance of the system.  ([Location 1968](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=1968))

 >[!note]
Software systems that have inefficient architectures can often be made to work effectively simply by adding more storage and more servers. The fact that hardware is cheap and people are expensive means that architectures that impede operation are not as costly as architectures that impede development, deployment, and maintenance.  ([Location 1986](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=1986))

 >[!note]
The architecture of the system should elevate the use cases, the features, and the required behaviors of the system to first-class entities that are visible landmarks for the developers. This simplifies the understanding of the system and, therefore, greatly aids in development and maintenance.  ([Location 1993](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=1993))

 - *spelunking*
 >[!note]
If you can develop the high-level policy without committing to the details that surround it, you can delay and defer decisions about those details for a long time. And the longer you wait to make those decisions, the more information you have with which to make them properly  ([Location 2028](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2028))

 >[!note]
What if the decisions have already been made by someone else? What if your company has made a commitment to a certain database, or a certain web server, or a certain framework? A good architect pretends that the decision has not been made, and shapes the system such that those decisions can still be deferred or changed for as long as possible.  ([Location 2035](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2035))


 >[!note]
• The use cases and operation of the system. • The maintenance of the system. • The development of the system. • The deployment of the system.  ([Location 2120](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2120))

 >[!note]
The most important thing a good architecture can do to support behavior is to clarify and expose that behavior so that the intent of the system is visible at the architectural level.  ([Location 2128](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2128))

 >[!note]
As strange as it may seem, this decision is one of the options that a good architect leaves open. A system that is written as a monolith, and that depends on that monolithic structure, cannot easily be upgraded to multiple processes, multiple threads, or micro-services should the need arise. By comparison, an architecture that maintains the proper isolation of its components, and does not assume the means of communication between those components, will be much easier to transition through the spectrum of threads, processes, and services as the operational needs of the system change over time.  ([Location 2142](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2142))

 >[!note]
Thus we find the system divided into decoupled horizontal layers—the UI, application-specific business rules, application-independent business rules, and the database, just to mention a few.  ([Location 2185](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2185))

 >[!note]
Be careful: This duplication is almost certainly accidental. Creating the separate view model is not a lot of effort, and it will help you keep the layers properly decoupled.  ([Location 2238](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2238))

 >[!note]
A good architecture will allow a system to be born as a monolith, deployed in a single file, but then to grow into a set of independently deployable units, and then all the way to independent services and/or micro-services. Later, as things change, it should allow for reversing that progression and sliding all the way back down into a monolith.  ([Location 2272](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2272))

 >[!note]
Recall that the goal of an architect is to minimize the human resources required to build and maintain the required system. What it is that saps this kind of people-power? Coupling—and especially coupling to premature decisions.  ([Location 2287](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2287))

 >[!note]
You should recognize this as an application of the Dependency Inversion Principle and the Stable Abstractions Principle. Dependency arrows are arranged to point from lower-level details to higher-level abstractions.  ([Location 2470](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2470))

 >[!note]
Such architectures almost always depend on some kind of dynamic polymorphism1 to manage their internal dependencies. This is one of the reasons that object-oriented development has become such an important paradigm in recent decades.  ([Location 2493](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2493))

## New highlights added October 29, 2022 at 11:12 PM
 - *etched*
 >[!note]
redeployed. Managing and building firewalls against this change is what boundaries are all about.  ([Location 2484](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2484))

## New highlights added December 28, 2022 at 4:11 PM
 >[!note]
So long as the layers and use cases are decoupled, the architecture of the system will support the organization of the teams, irrespective of whether they are organized as feature teams, component teams, layer teams, or some other variation.  ([Location 2216](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2216))

 >[!note]
Indeed, if the decoupling is done well, then it should be possible to hot-swap layers and use cases in running systems. Adding a new use case could be a simple as adding a few new jar files or services to the system while leaving the rest alone.  ([Location 2220](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2220))

 >[!note]
We shall call these rules Critical Business Rules, because they are critical to the business itself, and would exist even if there were no system to automate them.  ([Location 2632](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2632))

 >[!note]
So what does the architecture of your application scream? When you look at the top-level directory structure, and the source files in the highest-level package, do they scream “Health Care System,” or “Accounting System,” or “Inventory Management System”? Or do they scream “Rails,” or “Spring/Hibernate,” or “ASP”?  ([Location 2710](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2710))
**Your biz model should ve explicit**

 >[!note]
Architectures are not (or should not be) about frameworks. Architectures should not be supplied by frameworks. Frameworks are tools to be used, not architectures to be conformed to. If your architecture is based on frameworks, then it cannot be based on your use cases.  ([Location 2718](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2718))

 >[!note]
Develop a strategy that prevents the framework from taking over that architecture.  ([Location 2743](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2743))

 >[!note]
“We see some things that look like models—but where are the views and controllers?” And you should respond: “Oh, those are details that needn’t concern us at the moment. We’ll decide about them later.”  ([Location 2754](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2754))

 >[!note]
Hexagonal Architecture  ([Location 2761](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2761))

 >[!note]
data formats declared in an outer circle should not be used by an inner circle, especially if those formats are generated by a framework in an outer circle. We don’t want anything in an outer circle to impact the inner circles.  ([Location 2789](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2789))

 >[!note]
Entities encapsulate enterprise-wide Critical Business Rules.  ([Location 2791](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2791))

 >[!note]
these entities are the business objects of the application.  ([Location 2794](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2794))

 >[!note]
The View is the humble object that is hard to test. The code in this object is kept as simple as possible. It moves data into the GUI but does not process that data. The Presenter is the testable object. Its job is to accept data from the application and format it for presentation so that the View can simply move it to the screen. For example, if the application wants a date displayed in a field, it will hand the Presenter a Date object. The Presenter will then format that data into an appropriate string and place it in a simple data structure called the View Model, where the View can find it.  ([Location 2882](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=2882))
**Echo what Zizhang has shared about the SA frontend**

 >[!note]
system? Which kinds of tests are there? Are unit tests and integration tests different things? What about acceptance tests, functional tests, Cucumber tests, TDD tests, BDD tests, component tests, and so on?  ([Location 3292](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=3292))
**Come!! Throw more buzz words to me!**

 >[!note]
other. In fact, in many ways they represent the model that all other system components should follow.  ([Location 3303](https://readwise.io/to_kindle?action=open&asin=B075LRM681&location=3303))

