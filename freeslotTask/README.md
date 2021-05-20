## Setup

Used the command to install the packages

eg : `npm install moment-timezone` .


## database

Here I used mongodb for storing data. created slots and events collection. Whenever user requesting slots, I'm checking in events collection whether its available or not. if its already booked, then passing 'Not in' condition in slots collection and getting slots other than events. Now it will list only available slots which are not having events.



