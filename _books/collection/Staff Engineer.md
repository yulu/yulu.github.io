---
layout: post
tag: reading_status/reading
status: noted
category: tech
author: Will Larson and Tanya Reilly
cover: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/books/Staff_Engineer.jpg
---

## Summary - Inspectional Reading Question

##### What does this book talk about?

This book talks about how to be an staff engineer at tech companies. It starts with the types of staff(or above) engineers, that the responsibility of staff+ engineer, what should the staff+ engineer do in their work and how to become one. Second half of the book is the interview script with different staff+ engineers from various companies.

##### How does this book deliver the information?

This book is well structured and reference to the difference sources to expand the topic. The book is consice, with just enough example given while talking about concepts, and have a dedicated section(second half of the book) for the real stories. I really like this structure, contract to the style of some other books that mixed the discussion of the principle s with examples. 

##### Does the information delivered by this book make sense to you? Totally or partially?

Most of it, except the part of becoming a staff+ engineer, which I shall gain less from because I am already at the position.

##### How does this book related to you?

I could learn a lot from the tips given on how to behave as a staff engineer and enjoy the stories shared by other staff+ engineers and relate that to my own experiences.

## Reading notes

### Staff engineer archetypes

>Four types of Staff+ engineer
>- Tech Lead
>- Architect
>- Solver
>- Right Hand

#### Tech Leads
![][staff_engineer_tech_lead_schedule]

guides the approach and execution of a particular team. They partner closely with a single manager, but sometimes they partner with two or three managers. They are the most common Staff archetype and lead one team or a cluster of teams in their approach and execution. 
- scoping complex tasks
- coordinating the team towards solving them
- unblocking them along the way
- carry teams' context and maintain many of the essential cross-team and cross-functional relationships
- close partner to the team's product manager 
- roughly one TL for every 8 engineers

> leaning towards project and people management

#### Architect
![][staff_engineer_architect_schedule]

is responsible for the direction, quality, and approach within a critical area. They combine in-depth knowledge of technical constraints, user needs, and organization level leadership
- are responsible for the success of a specific technical domain within their company, for example, the company's API design, frontend stack, storage strategy, or cloud infrastructure.
- tends to evolve in relatively large companies, companies with exceptionally complex or coupled codebases, and companies that are struggling to repay the technical debt they created in their initial sprint to product-market fit

> Lead of tech leads?

#### Solver
![][staff_engineer_solver_schedule]

is a trusted agent of the organization who goes deep into knotty problems, continuing to work on them until they're resolved. Folks in this role are moved onto problems identified by organizational leadership as critical and either lacking a clear approach or with a high degree of execution risk
- do little org-level chiropractics
- common in companies that think of individuals, rather than teams, as the atomic unit of planning and ownership, less seen in sprint-centric team
- move from team to team

> expert in a specific tech domain

#### Right Hand
![][staff_engineer_righthand_schedule]

extends an executive's attention, borrowing their scope and authority to operate particularly complex organisations. They provide additional leadership bandwidth to leaders of large-scale organisations
- least common type
- showing up as an organization reaches hundreds of engineers and is akin to operating as a senior organisational leader without direct managerial responsibilities
- address issue that are never purely technology, people, culture and process

> Principal Engineer or Tech follow role

### Staff+ engineers' jobs

Tech expertise
- Exploration
  
Team leader
- Mentorship and sponsorship
- Being glue
  
X-func influencer
- Setting technical direction
- Providing engineering perspective

### Tips and guidance for staff+ engineers

#### 1. Work on what matters

![][staff_engineer_matters]

Don't
- **snacking**: easy and low impact work just to make yourself busy
- **preening**: low-impact but high-visibility work
- **chasing ghosts**: unnecessary grand migration work just because you are experienced in certain area or you want to take control of the territory 

> It's surprisingly common for a new senior leader to join a company and immediately drive a strategy shift that fundamentally misunderstands the challenges at hand. The ghosts of their previous situation hold such a firm grasp on their understanding of the new company that they misjudge the familiar as the essential.

Do

*self-focus*:
- **existential issues**: the problems that surfaces out already
- **where there's room and attention**: something that someone's already focused while there's still room to actually do work
- **what only you can do**: where you can make use of your expertise given the problem exists and prioritised

*other-focus*:
- **foster growth**: sponsor, onboarding, mentoring and coaching others
- **edit**: unblock others by providing small executions like giving tech advice, debugging on complicated issues, coordinating the communication
- **finish things**: special sort of editing to make others to close project

#### 2. Writing engineering strategy
Write five design docs, extract one common patten and make it as one strategy, write five strategies and align it to the business direction in the two to three years' time horizon to make it a vision.

![][staff_engineer_engineering_strategy]

> When should a design doc to be written? Three rule to help to make decision
> - when a number of other projects are to be depended on this one
> - when there's direct impact to users
> - anything that requires more than a month to complete

```
//todo 
#### 3. Managing technical quality
#### 4. Stay aligned with authority
#### 5. To lead, you have to follow
#### 6. Learn to never be wrong
#### 7. Create space for others
#### 8. Build a network of peers
#### 9. Present to executives
```

### Toolbox

The external reading materials linked by this book.

#### Sponsorship vs mentorship

[What sponsorship looks like](https://larahogan.me/blog/what-sponsorship-looks-like/)
- mentorship: advice
- sponsorship: opportunities and visibility

#### Team dynamics - weak and strong team

[Weak and strong team](https://lethain.com/weak-and-strong-team-concepts/)
> A strong team concept is one where ownership, work, and accountability are generally assigned to teams. Signs of a strong concept are sprints, story points, tracking tickets, SLAs, and goals. A weak team concept is one where most work is assigned to individuals, and work is driven primarily through interpersonal connections rather than process.
> 
> Non-gelled teams find it easier to rely on hierarchy than interpersonal relationships for rapid, effective response
> 
>  Almost! everything managers are taught is focused on managing young, mostly non-gelled teams. Do you really need a weekly 1:1 with someone you’ve worked with for six years? No, probably you don’t. (You do, of course, still need to make them feel appreciated.) Do you need agile and weekly sprints working with a team that mastered working together? It depends on the team, but it’s certainly not the only way.

#### All about documentations

[Documentation Tips](https://increment.com/documentation/)

#### Personal career growth consideration

[Career Focus](https://lethain.com/forty-year-career/)
- Pace
- People
- Prestige 
- Profile
- Learning

#### Technical leadership 

[Technical leadership at Slack](https://slack.engineering/technical-leadership-getting-started/)
<div class="mindmap-container">
    <iframe src="https://www.xmind.net/embed/zHsKmK" width="900px" height="540px" frameborder="0" scrolling="no"></iframe>
</div>

#### Running a technical book club

[Tips from Zendesk engineering](https://zendesk.engineering/recipes-for-running-a-successful-technical-book-club-at-work-4a7f18ffab42)



## Some highlights
 > Tech Leads are the most common Staff archetype and lead one team or a cluster of teams in their approach and execution. They’re comfortable scoping complex tasks, coordinating their team towards solving them, and unblocking them along the way. Tech Leads often carry the team’s context and maintain many of the essential cross-team and cross-functional relationships necessary for the team’s success. They’re a close partner to the team’s product manager and the first person called when the roadmap needs to be shuffled.   
 
 > Most importantly, an organization needs roughly one Tech Lead for every eight engineers, making it far more common than other archetypes.  
 
 > Some companies push for Architects to remain deep in the codebase, and others set a clear expectation that Architects must not write code: both models work for some companies.  

 > The Solver is most common in companies that think of individuals, rather than teams, as the atomic unit of planning and ownership  **A strong team concept is one where ownership, work, and accountability are generally assigned to teams. Signs of a strong concept are sprints, story points, tracking tickets, SLAs, and goals. A weak team concept is one where most work is assigned to individuals, and work is driven primarily through interpersonal connections rather than process.**

 > You’re far more likely to change your company’s long-term trajectory by growing the engineers around you than through personal heroics. The best way to grow those around you is by creating an active practice of mentorship and sponsorship.  


 > The answer is, of course, that it might be! The three consistent advantages that generally come with a Staff-plus title are: allowing you to bypass informal gauges of seniority, facilitating access to “the room,” increase in current and career compensation.  **Why you want/need to be a staff plus engineer**

 > The one consistent exception to this rule is that women and minorities often do find they spend significantly less time and energy, proving themselves once they attain a Staff-plus title. The title doesn’t unlock new abilities for them, but it does remove some of the weight they’d been carrying with them throughout their career. **The benefit of being a female staff plus engineers**

 > You should write design documents for any project whose capabilities will be used by numerous future projects. You should also write design documents for projects that meaningfully impact your users. You should write a design document for any work taking more than a month of engineering time.  **When should a design doc to be written? Three rule to help to make decision**
> - when a number of other projects are to be depended on this one
> - when there's direct impact to users
> - anything that requires more than a month to complete

 > Most folks are better writers than they are editors. This means it’s usually harder to edit a group document into clear writing than to identify one author to write a clear document. Gather perspectives widely but write alone.  

 > Be a bit more detailed than you’re comfortable with.  

 > Rather than a failure, closing the gap between your current and target technical quality is a routine, essential part of effective engineering leadership.  

 > When you combine that lack of familiarity with your domain with limited time for the topic at hand, communication is a challenge.   
 
 > Broad-scoped engineers create impact by working on vague, cross-organizational projects. They tend to accumulate a lot of context across many different domains and play a support role in many projects across the org. This shape of Staff-plus Engineer is most common on our product engineering teams.  

 > Deep-scoped engineers tend to be subject-matter experts in a specific domain. They lead ambitious multi-year projects. This shape of Staff-plus Engineer can generally be found on our product infrastructure and systems teams.  

 > I’m creating leverage and scaling my own impact by disseminating useful mental models and ideas.  **This is actually important! Building and promiting mental models to facilitate others in design and delivery their own work**

 > I think that’s an important criteria for Staff-plus Engineers in product: not to just build something that ships, but for it to roll out smoothly and continue to succeed and grow over time with as few regrettable choices as possible. There will always be corners cut and features descoped during product development, especially for new products. A Staff product engineer makes those product and technical choices deliberately, taking on various different user personas to make the best choice possible and documenting rough edges thoroughly for future engineers.  

 > Another aspect of building leverage as a product engineer is creating processes and systems to manage “product debt.” Folks often talk about “technical debt,” but equally important is the “product debt” caused by supporting old versions of your product, and much of the difficulty of product engineering at scale is related to managing product debt and product drift (that is, products that need to interoperate with each other moving in different directions) over time.  **I like the term - product debt. This is a genius summery of the problem that a product team that is running for a longer lifepsan is facing!**

 > working on projects/efforts that have strategic value for the company, while driving technical design and up-leveling their team.  

 > Premature processes add more friction than value and are quick to expose themselves as ineffective. If something isn’t working, try for a bit to make it work, and then celebrate its demise.  

 > but it’s much more important to understand the problem at hand and try to fix it directly than to create process-driven accountability.  

 > but I recommend practices after hot spotting. Adopting best practices requires a level of organizational and leadership maturity that takes some time to develop.  
 
 > call those quality leverage points, and the three most impactful points are interfaces, stateful systems, and data models.  

 > In general, treat each time you surprise your manager as an incident to be learned from and endeavor to prevent repeats.  

 > If you only see the gap without acting on it, you might be a visionary, but you’re inert. If you take action without a clear view of the goal, many will consider you a leader, but your impact will be random, arbitrary, and inefficient.  

 > effective leaders don’t split the world into a leader and follower dichotomy, rather they move in and out of leadership and follower roles with the folks around them.  

 > Be clear with yourself what your true priorities are, and don’t dilute yourself across everything that comes up.  

 > Make your feedback explicitly non-blocking. This can be classifying a code review comment as an “optional nit,” but it can also be writing up detailed feedback but delivering it to someone mentioning that you wanted to share your perspective rather than necessarily change their approach.  **Don’t touch my code, comment on it**

[staff_engineer_tech_lead_schedule]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/staff-engineer/staff_engineer_tech_lead_schedule.png
[staff_engineer_architect_schedule]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/staff-engineer/staff_engineer_architect_schedule.png
[staff_engineer_solver_schedule]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/staff-engineer/staff_engineer_solver_schedule.png
[staff_engineer_righthand_schedule]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/staff-engineer/staff_engineer_righthand_schedule.png
[staff_engineer_matters]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/staff-engineer/staff_engineer_matters.excalidraw.png
[staff_engineer_engineering_strategy]: https://s3.ap-southeast-1.amazonaws.com/littlecheesecake.me/blog-post/staff-engineer/staff_engineer_engineering_strategy.excalidraw.png