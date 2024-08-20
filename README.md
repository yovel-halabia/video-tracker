# VIDEO TRACKER


## General Information
Link to website [link](https://video-tracker-h5b9btffcwcndrdd.eastus-01.azurewebsites.net/)<br/>
This project is Video Tracker website you can create list with videos and track your watching progress.

## Technologies Used
![Skills](https://skillicons.dev/icons?i=js,html,css,cs,angular,dotnet)

## Features
* Authentication:<br/>
Can login/signup using net core identity service and jwt service<br/>
* 3 party integration - YouTube services:<br/>
Can search youtube videos and add them to track using Google.YouTube.Service <br/>
* Track your videos:<br/>
-- Remember last video you saw and exact time.<br/>
-- Mark as seen video you finish watch.<br/>
-- Auto next to next video in the list.<br/>
* Optimistic update:<br/>
  Instead waiting results from API any changes user do (except for create new track and login/register)
  appears immediately in the frontend שnd at the same time request sent to the server for an update.

## Data Architecture
![data](https://i.ibb.co/JBzt2Z3/Untitled-1-1.jpg)



## Setup
To setup local environment:<br/>
Clone the repository to your local machine<br/><br/>
Open the project in the IDE and run the following command in terminal:<br/>
`cd frontend`<br/>
`ng serve`<br/>
Open another terminal window and run th follwing command:<br/>
`cd backend`<br/>
`dotnet watch run`<br/><br/>
Create DB sql server with follwoing details:<br/>
server=localhost<br/>
port=1433<br/>
User ID=SA<br/>
Password=Dev@1234<br/>
TrustServerCertificate=True<br/>

## Contact
Created by [@yovel_halabia](https://www.linkedin.com/in/yovel-halabia-450a2b1b2/)


