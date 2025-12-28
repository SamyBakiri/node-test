# BuildIT
- **Theme : Background jobs, queues, and batch processing**

## Introduction :
### Background Jobs :
Background jobs are tasks that run asynchronously, independent of the server process. They are used for tasks that aren't time sensitive and for optimisation purposes. 

### Queues :
Queues are a data structures used to store jobs. It's a way to give "order" for these jobs, typically it's done first in first out. The first job that goes in is the first to be executed, while the last ones must wait. It's a good method to structure multiple processes, keeping them structured. 
```mermaid
---
config:
  theme: redux
  layout: fixed
---
flowchart LR
  subgraph QueueQ [Queue]
      direction LR
      Q1["Job A"] -.-> Q2["Job B"] -.-> Q3["Job C"]
    end
    Server -- enqueue job --> QueueQ
```

### Batch Processing :
Instead of processing task one at a time, batch processing groups them into "batches" to be executed at the same time. This can heavily optimise high volume operations, for example if too many jobs are overflowing the queue, grouping them into batches will make things faster.


### Worker :
It's a process with responsibility to pull background jobs from a queue, and executes them.
```mermaid
flowchart LR
    subgraph QueueQ [Queue]
      direction LR
      Q1["Job A"] -.-> Q2["Job B"] -.-> Q3["Job C"]
    end
    QueueQ -- group into batch --> Batch["Batch<br/>(Grouped Jobs)"]
    Batch --> Process1["Worker 1"]
    Process1 -.- Process2["Worker n"]
    Process1 --> Database["Database"]
    Process2 --> Database["Database"]
```

## Project :
We built a marketing platform that provides email services to companies. The companies come to the platform and request their marketing email to be sent or scheduled to hundreds of users, the website takes charges of this task while also providing the companies useful analytics such as how many users received the email. 

## Problem :
Say if hundreds of users are using the site, and all of them send their email at once.
The backend will process them one by one which not only takes a long time, but also delays other processes such as user authentication. This can induce a deadlock at some point.
```mermaid
---
config:
  theme: redux
  layout: fixed
---
flowchart LR
    subgraph Users["Many Users"]
        direction TB
        u1["User 1"]
        un["User n"]
    end
    u1 -.- un

    subgraph Backend["Backend Server"]
        direction TB
        be["Processes Email One by One"]
    end


    u1 -- "Send email" --> be
    un -- "Send email" --> be

    be -.-> slow["Slow email delivery!"]
    be -.-> block["Other backend processes delayed or blocked (ex: auth)"]
```

## Solution : 
A solution to this is defining a background job, which consists of the server taking
each email and pushing them into a queue. The worker is tasked with pulling jobs from the queue and processing them. 
Seperating emails into background jobs give concurency for the backend, which allows it the to also process other tasks seperate from emails. Resolving the above problem.

```mermaid
flowchart LR
    subgraph Users["Many Users"]
        direction TB
        u1["User 1"]
        un["User n"]
    end
    u1 -.- un

  subgraph Backend["Backend Server"]
          direction TB
      end
  
      u1 -- "Send email 1" --> Backend
      un -- "Send email n" --> Backend

    Backend --enqueue emails --> QueueQ

    subgraph QueueQ [Queue]
      direction LR
      Q1["Email 1"]  -.-> Q3["Email n"]
    end
    QueueQ --> Process1["Worker 1"]
    Process1 -- Processes and Sends Emails --> NodeMailer
```

## Tech stack:
### Backend :
- NodeJS
- ExpressJS
- MariaDB
- Redis + BullMQ
### Frontend :
- React 
