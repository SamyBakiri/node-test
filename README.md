# BuildIT
- **Theme : Background jobs, queues, and batch processing**

## Summary :
We built a marketing platform that provides email services to companies. The companies come to the platform and request their marketing email to be sent or scheduled to hundreds of users, the website takes charges of this task while also providing the companies useful analytics such as how many users received the email. 

## Problem :
Say if hundreds of users are using the site, and all of them send their email at once.
The backend will process them one by one which not only takes a long time, but also delays other processes such as user authentication. This can induce a deadlock at some point.

-- draw some graph or smth symbolising this--

## Solution : 
A solution to this is defining a background job, which consists of the server taking
each email and pushing them into a queue. Every email is devided into a batch, and each batch is processed seperately. The worker is tasked with pulling jobs from the queue and processing them. 

-- draw how background jobs and queues work a graph and stuff--

Background jobs give concurency for the backend, which allows it the to also process other tasks seperate from emails. Resolving the above problem.

## Tech stack:
### Backend :
- NodeJS
- ExpressJS
- MariaDB
- Redis + BullMQ
### Frontend :
- React 
