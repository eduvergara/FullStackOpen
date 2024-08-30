
# FSO Phonebook Project - Frontend
  
- Front-end repo: https://github.com/eduvergara/FullStackOpen/tree/main/part2/phonebook
- Live app: https://fso-part3-phonebook-backend-e0so.onrender.com/

Note: When first accessing the live website, you may experience a delay of approximately 50 seconds for the initial data requests. This delay occurs because free web services instances hosted on Render.com’s free tier,  will spin down with inactivity. As a result, the first request to the server after it has been inactive triggers a "cold start," causing the slow response time.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Usage](#usage)

## Overview

This project is a React-based frontend application for managing a phonebook. It interacts with a backend API connected to MongoDB to perform CRUD operations on contact data.

## Technologies Used

- React (^18.3.1)               : A JavaScript library for building user interfaces.
- Vite (^5.3.4)                 : A modern build tool that provides fast development and build speeds.
- Axios (^1.7.2)                : A promise-based HTTP client for making API requests.
- ESLint (^8.57.0)              : A tool for identifying and fixing problems in JavaScript code.
- json-server (^1.0.0-beta.1)   : A tool for setting up a fake REST API for testing and prototyping.

## Installation

1. Clone the repository:

```
git clone https://github.com/your-username/phonebook.git
```
  
2. Navigate to the project directory:

```
cd phonebook
```

3. Install dependencies:
```
npm install
```

## Available Scripts

- npm run dev: Start the development server using Vite.
- npm run build: Build the project for production.
- npm run lint: Run ESLint to check for code quality and formatting issues.
- npm run preview: Preview the built project.
  
## API Endpoints

The frontend interacts with the backend API using the following endpoints:

- GET /api/persons      :Fetch all contacts.
- GET /api/persons/     :Fetch a contact by ID.
- POST /api/persons     :Add a new contact.
- PUT /api/persons/     :Update a contact.
- DELETE /api/persons/  :Delete a contact.

## Features

- Contact List: Display all contacts in a list format.
- Add Contact: Form to add new contacts.
- Edit Contact: Edit existing contact details.
- Delete Contact: Remove contacts from the list.

## Folder Structure

```
.
├── src                     # Contains all the source code for the application.
│   ├── components          # Reusable React components.
│   ├── pages               # React components for different pages or views.
│   ├── services            # API service functions using Axios.
│   ├── App.jsx             # Main application component.
│   └── index.jsx           # Entry point for the React application.
└── public                  # Public assets and HTML files.
```

## Usage

1. Start the Backend Server: Navigate to the backend project directory and run:

```
cd path/to/your/backend
npm run dev
```

This command will start the backend server, which connects to the MongoDB database and handles API requests.

2. Start the Frontend Development Server: In a separate terminal, navigate to the frontend project directory and run:

```
cd path/to/your/frontend
npm run dev
```

This will start the frontend development server and open the React application in your browser.

Note: If the backend server is not running, the frontend application will not be able to fetch or display contact data, as it relies on the backend API to retrieve and manage the data. Ensure both servers are running for the full functionality of the application. If you only run the frontend (npm run dev), you will still be able to see the app at http://127.0.0.1:5173/, but it will not display any contact information or allow interaction with the backend features.