# NC News API

A RESTful backend API for a news aggregation platform, built with Node.js and Express. It allows users to browse and filter articles, post and delete comments, explore topics, and look up user profiles — all served as JSON.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)

---

## Getting Started

Follow the steps below to get a local copy of the project up and running.

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) (v14 or higher recommended)

---

## Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/nc-news-api.git
cd nc-news-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root of the project and add your database connection details:

```
PGDATABASE=your_database_name
```

4. **Set up and seed the database**

```bash
npm run setup-dbs
npm run seed
```

---

## Running the Server

To start the server in development mode:

```bash
npm start
```

The API will be available at `http://localhost:9090/api` by default.

---

## API Endpoints

All endpoints are prefixed with `/api`. Full interactive documentation is available in `index.html`.

### Articles

| Method | Endpoint                             | Description                                                             |
| ------ | ------------------------------------ | ----------------------------------------------------------------------- |
| GET    | `/api/articles`                      | Get all articles. Supports `sort_by`, `order`, and `topic` query params |
| GET    | `/api/articles/:article_id`          | Get a single article by ID                                              |
| PATCH  | `/api/articles/:article_id`          | Update vote count on an article                                         |
| GET    | `/api/articles/:article_id/comments` | Get all comments for an article                                         |
| POST   | `/api/articles/:article_id/comments` | Post a new comment on an article                                        |

#### Query Parameters for `GET /api/articles`

| Parameter | Accepted Values                                   | Default            |
| --------- | ------------------------------------------------- | ------------------ |
| `sort_by` | `created_at`, `votes`, `title`, `author`, `topic` | `created_at`       |
| `order`   | `asc`, `desc`                                     | `desc`             |
| `topic`   | any valid topic slug                              | null (returns all) |

### Comments

| Method | Endpoint                    | Description            |
| ------ | --------------------------- | ---------------------- |
| DELETE | `/api/comments/:comment_id` | Delete a comment by ID |

### Topics

| Method | Endpoint      | Description    |
| ------ | ------------- | -------------- |
| GET    | `/api/topics` | Get all topics |

### Users

| Method | Endpoint               | Description                   |
| ------ | ---------------------- | ----------------------------- |
| GET    | `/api/users`           | Get all users                 |
| GET    | `/api/users/:username` | Get a single user by username |

---

## Error Handling

The API returns consistent error responses in the following format:

```json
{ "msg": "Description of the error" }
```

| Status Code | Meaning                                                              |
| ----------- | -------------------------------------------------------------------- |
| `400`       | Bad Request — invalid input, malformed ID, or incorrect request body |
| `404`       | Not Found — resource does not exist                                  |
| `405`       | Method Not Allowed — HTTP method not supported on this endpoint      |
| `500`       | Internal Server Error                                                |

---

## Tech Stack

- **Runtime** — Node.js
- **Framework** — Express
- **Database** — PostgreSQL
- **CORS** — enabled via the `cors` package
