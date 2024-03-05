In this project we will pnly focus on creating backend not the front end, so we will be using express, mongoose, passport, multer, etc.,

So we are jsut goign to create routes with express, and then put all the frontend in the ejs files, also we will connect the mongo db, and use additional things like passport for authentication and multer for file uplaods, etc.,

So we will create /login /register /feed /profile /logout routes etc.,

=========================================================

LETS DOCUMENT HOW WE ARE DOING THIS PROJECT STEP BY STEP:
First understand the folder structure, in views we have all our EJS which is our HTML FRONTEND, then in routes index.js we will be creating our routes and link it to our ejs files, then in app js 

-First we created the login and register page using the ejs format and linked these two pages with the routes, if we go to '/' route we will get login page, '/register' route will give register page.

-Then we are going to get data from user and store data in a database in mongo db, so first we need to install some packages like '$ npm i mongoose passport passport-local passport-local-mongoose express-session'

-