# Bookme

Bookme is a web application that allows users to book appointments and services.
You can preview the working web application on https://bookme-app-1331.fly.dev.

This repository contains the source code for the Bookme web application.
Including both the frontend and backend components.

## Time logging

Time spent during the project work can be found [here](/timesheet.md)

## Features

* Service selection and booking
* Time selection and scheduling
* Client form and information collection
* Booking success page and confirmation email

## Technology Stack

* Frontend: React, TypeScript, Vite, MaterialUI, React Router, Redux, React Schedule Meeting
* Backend: Node.js, Express, TypeORM, Dotenv, Express, Nodemailer, Zod
* Database: PostgreSQL
* Hosting: Fly.io

## Getting Started

### Prerequisites

* Node.js (version 18 or higher)
* npm (version 10.8 or higher)
* PostgreSQL (version 16 or higher)

### Installation

1. Clone the repository: `git clone https://github.com/rhexa/bookme.git`
2. Create a .env file based on the [./backend/env-sample](/backend/env-sample) file: cp env-sample .env
3. Update the environment variables in the .env file as needed
4. Install the dependencies within the backend `npm install`
5. Start the backend server: `npm run dev`
6. Install the dependencies within the frontend `npm install` (in a separate terminal window)
7. Start the frontend server: `npm run dev`

### Usage

1. Open a web browser and navigate to `http://localhost:5173`
2. Select a service and time slot
3. Fill out the client form
4. Confirm the booking

## API Documentation

The base URL of the API is `http://localhost:3000/api`

### Service Endpoints

* `GET /services`: Retrieve a list of services with their categories.
* `GET /services/:id`: Retrieve a service by ID with its category.
* `POST /services`: Create a new service.
* `PUT /services/:id`: Update a service by ID.
* `DELETE /services/:id`: Delete a service by ID.
* `POST /services/:id/book`: Book a service by ID.

### Category Endpoints

* `GET /categories`: Retrieve a list of categories, optionally including related services if `full=true` query parameter is provided.