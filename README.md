
<p align="center">
  <img src="https://github.com/thesamirkhoury/HOA-Managment/assets/96683609/a8ede929-4347-45ec-9fcb-bf426b124348" width="600">
</p>


# Nahel - HOA Management System

The HOA in general handles the collection of monthly fees, manages faults with coordination with suppliers, and general maintenance of the buildings etc., the HOA also sends relevant messages and notifications to the residents.
The HOAs, by law (in Israel), are required to publish financial reports at least once a year, and therefore HOAs need to keep a very precise book for them to publish these reports.

This project deals with creating a system that helps HOA to manage the building more simpler and more efficiently, and for tenants to keep track and in some situations contact their HOA.

Today, there are only a few specific solutions for that problem, especially solutions that give all the tools required and that are available from anywhere at any time.
This project aims to fill this void, by providing an easy-to-use cloud-based web app.

The solution that was developed in the course of this project is a two-piece web-based solution, a dashboard for tenants and a dashboard for the HOA board, the cloud-based web apps are also available for self-hosting and were built using standard modern web frameworks.




## Tech Stack

The MERN Stack was used for this project.

- ReactJS - front-end
- NodeJS - backend
- ExpressJS - backend framework
- MongoDB - NoSQL Database

the deployed version of this web app was deployed on an Ubuntu server using docker and docker compose.


## Usage

to use the system you can visit the website at https://www.nahel.onlie and follow the instructions posted at the website.



## Environment Variables

To run this project, you will need to add environment variables to your `.env.example` files in all frontend and backend directories

an example file is available in each folder, rename the file after editing it according to the instruction in the Run Locally or the Deployment Sections.

## Run Locally

Clone the project

```bash
  git clone https://github.com/thesamirkhoury/HOA-Managment.git
```

Go to the project backend directory

```bash
  cd HOA-Managment/backend
```

Install dependencies

```bash
  npm install
```

Make sure that all the environment variables in the `.env.example file and the frontend are filled properly and rename the file to `.env`

Start the server

```bash
  npm start
```
or 
```bash
  npm run dev
```

go to the project frontend directories 

 1. The board dashboard

```bash
  cd HOA-Managment/frontend/managers
```
Install dependencies

```bash
  npm install
```

Make sure that all the environment variables in the `.env.example file and the frontend are filled properly and rename the file to `.env.local`

Start the server

```bash
  npm start
```

2. The tenants' dashboard
```bash
  cd HOA-Managment/frontend/tenants
```
Install dependencies

```bash
  npm install
```

Make sure that all the environment variables in the `.env.example file and the frontend are filled properly and rename the file to `.env.local`

Start the server

```bash
  npm start
```
## Deployment

To deploy and self-host this project first clone this repo

```bash
  git clone https://github.com/thesamirkhoury/HOA-Managment.git
```

Please note that the deployment is done using docker and docker compose, make sure they are both installed on the hosting machine

Go to the project directory

```bash
  cd HOA-Managment
```
Make sure that all the environment variables in the `.env.example files both in the backend and the frontend are filled properly and rename these files to `.env.production`


Start the docker containers

```bash
  docker compose up -d
```
## Support

For support, email support@nahel.online


## Used By

This project was developed as a graduation project for the bachelor's degree in software engineering, Azrieli, Jerusalem College of Engineering (JCE).

terms of service posted on the website https://www.nahel.online/terms


## Author

- [@thesamirkhoury](https://www.github.com/thesamirkhoury)

