# Server

This is the repository for server side logic of the Resume-Recommender application.

## About the project

This is a django and django-rest-framework project. It provides APIs for extracting details from resumes in pdf format. The details are restructured into a valid json object. The details are then utilized to generate recommendations for the job opening for which the resumes were uploaded.

## Key services

- Create Session  
- Upload Resumes
- Generate Recommendations
- Get Recommendations 

## Installation

- Install Python 3.10.7

- Clone the repository

  ```
  git clone https://github.com/Vaibhav-22-dm/Resume-Recommender.git
  ```

- Change directory to server
  
  ```
  cd Resume-Recommender/server
  ```

- Install virtualenv package

  ```
  pip install virtualenv
  ```

- Create a virtual environment

  ```
  virtualenv env
  ```

- Activate the virtual environment
  
  ```
  ./env/Scripts/activate
  ```

- Install requirements

  ```
  pip install -r requirements.txt
  ```

- Sign Up at https://openai.com/ 

- Create you own OPEN AI API Key at https://platform.openai.com/api-keys

- Create an .env file and paste the API key in the file
  ```
  OPENAI_API_KEY=YOUR_OPEN_AI_API_KEY
  ```

- Create the User table in the database

  ```
  python manage.py makemigrations
  python manage.py migrate
  ```

- Create the Resume and Session table in the database

  ```
  python manage.py makemigrations app
  python manage.py migrate
  ```

- Create a superuser
  ```
  python manage.py createsuperuser
  ```

- Start the server
  ```
  python manage.py runserver
  ```

- Server is live at 

  ```
  http://localhost:8000/
  ```

- To access the django-admin follow:
  ```
  http://localhost:8000/admin
  ```

## Third-Party Services

This project uses "gpt-3.5-turbo-instruct" model of OPEN AI for structuring the text extracted from resumes and to score them on the basis of relevance to the job description.