# 🎂 Birthday Reminder Service

![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue) ![Docker](https://img.shields.io/badge/Docker-Enabled-blue) ![License](https://img.shields.io/badge/license-MIT-green)

A robust backend service designed to store user data and send **Happy Birthday** reminders via background jobs. Messages are delivered precisely at **9:00 AM in the user's local timezone**.

Built as a take-home assignment demonstrating **Clean Architecture**, **Timezone Correctness**, and **Scalability**.

---

## 📑 Table of Contents
- [🚀 Features](#-features)
- [🧱 Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [⚙️ Environment Variables](#️-environment-variables)
- [🐳 Running with Docker (Recommended)](#-running-with-docker-recommended)
- [🧑‍💻 Running Locally](#-running-locally)
- [🌍 Timezone & Birthday Logic](#-timezone--birthday-logic)
- [🧪 Testing & Seeding](#-testing--seeding)
- [📌 API Documentation](#-api-documentation)
- [👤 Author](#-author)

---

## 🚀 Features

- **User CRUD API**: Full management of user data.
- **Strong Validation**: Request payloads validated using **Zod**.
- **Timezone-Aware**: Accurately handles birthdays across different timezones (e.g., UTC vs Asia/Jakarta).
- **Background Jobs**: Powered by **Agenda** & **MongoDB**, running efficiently in the background.
- **Smart Scheduling**: Checks for birthdays hourly and sends reminders only at 09:00 local time.
- **Scalable**: Uses DB cursors to handle large datasets without memory overload.
- **Dockerized**: Fully containerized environment for easy setup.

---

## 🧱 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Runtime** | Node.js 20 + TypeScript |
| **Framework** | Express.js |
| **Database** | MongoDB + Mongoose |
| **Job Scheduler** | Agenda |
| **Time/Date** | Moment-Timezone |
| **Validation** | Zod |
| **Testing** | Jest + Supertest |
| **DevOps** | Docker & Docker Compose |

---

## 📂 Project Structure

```bash
src/
 ├── app.ts                  # App configuration
 ├── server.ts               # Entry point
 ├── config/                 # Environment & Swagger config
 ├── modules/                # Feature-based modules
 │    └── users/
 │         ├── user.controller.ts
 │         ├── user.service.ts
 │         ├── user.repository.ts
 │         ├── user.model.ts
 │         ├── user.routes.ts
 │         └── user.validator.ts
 ├── worker/                 # Background job logic
 │    ├── agenda.ts          # Agenda setup
 │    ├── birthday.job.ts    # Job definition
 │    └── birthday.service.ts # Job logic
 ├── shared/                 # Shared utilities (Logger, DB)
 ├── seeds/                  # Data seeders
 └── tests/                  # Unit & Integration tests

```

 ## ⚙️ Environment Variables
 Create a .env file in the root directory:

```plain
NODE_ENV=development
PORT=3000
MONGO_URI=mongodb://admin:admin123@mongo:27017/birthday?authSource=admin
```

## 🐳 Running with Docker (Recommended)
This allows you to run the API and MongoDB without installing them locally.

### 1. Build and start services
```bash
docker compose up --build
```

This will start the API service and MongoDB (with auth).

### 2. Access the Application

1. API: http://localhost:3000
2. Swagger Docs: http://localhost:3000/docs

## 🧑‍💻 Running Locally
If you prefer running Node.js locally without Docker containers for the app:

### 1. Install dependencies
```
npm install
```

### 2. Start MongoDB 
Ensure you have a MongoDB instance running locally (e.g., via mongod or a local container).

### 3. Run the app
``` bash
npm run dev
```

## 🌍 Timezone & Birthday Logic

The core challenge of this service is sending emails at **09:00 AM User's Local Time**, regardless of where the server is hosted.

### ⚙️ How it works:

1.  **Hourly Worker**: The Agenda job runs every hour (UTC).
2.  **Timezone Filtering**: The system calculates which timezones currently have the time **09:00 AM**.
3.  **Targeted Query**: It queries the database *only* for users living in those specific timezones.
4.  **Date Match**: It checks if the `day` and `month` match today's date in that timezone.
5.  **Logging**: Logs a message: `Happy Birthday <name> (<email>)`.

> **Note:** This approach is highly scalable as it filters users by timezone first, rather than iterating through all users.

## 🧪 Testing & Seeding
### Running Tests
Tests run against a temporary test database and automatically clean collections after execution.

```
# Run all tests
npm test

# Run in watch mode
npm run test:watch
```

### Seeding Data
To verify the birthday logic immediately, you can seed users whose birthday is Today `(in Asia/Jakarta timezone)`.

```
# If running via Docker
docker compose exec api npm run seed:users:today

# If running locally
npm run seed:users:today
```

The seeder sets the day/month to today and randomizes the year.

## 📌 API Documentation
Full API documentation is available via Swagger UI.

👉 http://localhost:3000/docs

### 📌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/users` | Create a new user |
| **GET** | `/users` | List users (with pagination) |
| **GET** | `/users/:id` | Get user details |
| **PUT** | `/users/:id` | Update user data |
| **DELETE** | `/users/:id` | Delete a user |

## ✅ Evaluation Checklist

This project was built to satisfy the following requirements:

- [x] **Clean Architecture**: Modular structure separating concerns.
- [x] **Strong Validation**: Inputs validated via Zod.
- [x] **Timezone-Safe Logic**: Correctly handles local times vs UTC.
- [x] **Background Worker**: Agenda handles scheduled tasks reliably.
- [x] **Dockerized Setup**: Easy `docker compose up` experience.
- [x] **Unit & Integration Tests**: Ensures reliability.
- [x] **Clear Documentation**: You are reading it!

---

## 👤 Author

**Riyanti Maulya**

* **GitHub Repository**: [Birthday-Reminder-Service-HubbedIn](https://github.com/Ricanz/Birthday-Reminder-Service—HubbedIn)

---