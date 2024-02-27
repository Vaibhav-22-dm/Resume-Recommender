# Client

This is the repository for client side logic of the Resume-Recommender application.

## About the project

This is a React.js project. It provides User Interface for clients to upload resumes along with description of the job opening. The Job description and resumes are sent to the server for processing. Details are extracted and displayed in proper format on the dashboard. Resumes with a relevance score of greater than 80% are marked as recommended for the job.

## Key features

- Multiple File Uploads
- Dashboard for displaying profile details

## Installation

- Install node v20.11.0

- Clone the repository

  ```
  git clone https://github.com/Vaibhav-22-dm/Resume-Recommender.git
  ```

- Change directory to client
  
  ```
  cd Resume-Recommender/client
  ```

- Install node modules

  ```
  npm i
  ```

- Start the app

  ```
  npm start
  ```

- App is live at 

  ```
  http://localhost:3000/
  ```

## Workflow

- Upload the resumes
- Add title and description of the job role
- Recommended profiles will be displayed on the dashboard