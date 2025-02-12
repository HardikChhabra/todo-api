# TODO-API

An API to create an authenticated TODO and task managing application, where users can create tasks, look them up, mark them as complete, change color, and if anything goes wrong, delete them too.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file.

`DATABASE_URL` Secret url to your database.

`JWT_SECRET` Secret string key.

## Run Locally

Clone the project

```bash
  git clone https://github.com/HardikChhabra/todo-api.git
```

Go to the project directory

```bash
  cd todo-api
```

`Make sure you have the .env file`

Install dependencies

```bash
  npm install
```

Generate and Migrate to your database

```bash
  npm drizzle-kit generate
  npm drizzle-kit migrate
```

Start the server

```bash
  npm run dev
```

# API Endpoints

## Authentication

| Endpoint         | Method | Body Parameters             | Auth Required | Response      |
| ---------------- | ------ | --------------------------- | ------------- | ------------- |
| `/auth/register` | POST   | `email`, `name`, `password` | No            | Returns token |
| `/auth/login`    | POST   | `email`, `password`         | No            | Returns token |

## Task

| Endpoint     | Method | Body Parameters                                                                                        | Auth Required | Response                                       |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------ | ------------- | ---------------------------------------------- |
| `/task/`     | POST   | `task` (required), `description` (optional), `isComplete` (default: false), `color` (default: #FFFFFF) | Yes           | Returns new task JSON                          |
| `/task/`     | GET    | None                                                                                                   | Yes           | Returns array of tasks belonging to user       |
| `/task/{id}` | GET    | None                                                                                                   | Yes           | Returns task JSON if found, else status 204    |
| `/task/{id}` | PUT    | `task`, `description`, `isComplete`, `color`                                                           | Yes           | Returns updated task JSON or status 404        |
| `/task/{id}` | DELETE | None                                                                                                   | Yes           | Returns status 204 if deleted, else status 404 |
