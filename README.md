# VIDEO TRACKER


## General Information
This project is Video Tracker website you can create list with videos and track your watching progress.

## Technologies Used
![Skills](https://skillicons.dev/icons?i=js,html,css,cs,angular,dotnet)

## Features
-- Authentication:
  can login/signup using net core identity service and jwt service
-- 3 party integration - YouTube services:
  can search youtube videos and add them to track using Google.YouTube.Service 
-- Track your videos:
* Remember last video you saw and exact time.
* Mark as seen video you finish watch.
* Auto next to next video in the list.
-- Optimistic update:
  Instead waiting results from API any changes user do (except for create new track and login/register)
  appears immediately in the frontend שnd at the same time request sent to the server for an update.

## Setup
To setup local environment:<br/>
Clone the repository to your local machine<br/>
Open the project in the IDE and run the following command in terminal:<br/>
`cd frontend`<br/>
`ng serve`
Open another terminal window and run th follwing command:<br/>
`cd backend`<br/>
`dotnet watch run`<br/>
Create DB sql server with follwoing details:<br/>
server=localhost<br/>
port=1433<br/>
User ID=SA<br/>
Password=Dev@1234<br/>
TrustServerCertificate=True<br/>

## Contact
Created by [@yovel_halabia](https://www.linkedin.com/in/yovel-halabia-450a2b1b2/)


