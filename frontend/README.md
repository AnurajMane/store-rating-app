# Store Rating System

A full-stack web application that allows users to browse stores, submit ratings, and manage store information through role-based dashboards.

## Features

### Authentication & Authorization

- User Registration
- User Login
- JWT Authentication
- Role-Based Access Control
- Password Hashing using bcrypt

### Roles

#### Admin

- View dashboard statistics
- Create new users
- Create new stores
- View all users
- View all stores
- Search users
- Search stores
- Sort users
- Sort stores

#### User

- Login/Register
- View all stores
- Search stores
- Submit ratings
- Update ratings
- View own ratings

#### Store Owner

- Login
- View store information
- View average rating
- View users who rated their store

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Axios
- Bootstrap

## Backend

- Node.js
- Express.js
- PostgreSQL
- JWT
- bcryptjs

## Database

- PostgreSQL

---


# Database Setup

## Create Database

Open PostgreSQL shell:

```sql
CREATE DATABASE store_rating_db;
```

Connect to database:

```sql
\c store_rating_db
```

---

## Users Table

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    address VARCHAR(400),
    role VARCHAR(20) NOT NULL
        CHECK(role IN ('ADMIN','USER','STORE_OWNER')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Stores Table

```sql
CREATE TABLE stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    address VARCHAR(400),
    owner_id INTEGER REFERENCES users(id)
);
```

---

## Ratings Table

```sql
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    rating INTEGER NOT NULL
        CHECK(rating BETWEEN 1 AND 5),
    user_id INTEGER REFERENCES users(id),
    store_id INTEGER REFERENCES stores(id),
    CONSTRAINT unique_user_store
        UNIQUE(user_id, store_id)
);
```

---

# Environment Variables

Create a `.env` file inside backend folder.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=9999
DB_NAME=store_rating_db
DB_USER=postgres
DB_PASSWORD=root

JWT_SECRET=my_super_secret_key
```

Update values according to your PostgreSQL installation.

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start backend:

```bash
npm run dev
```

Expected output:

```bash
Server running on port 5000
```

Backend URL:

```text
http://localhost:5000
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start frontend:

```bash
npm run dev
```

Expected output:

```bash
VITE vX.X.X ready

Local:
http://localhost:5173
```

Open:

```text
http://localhost:5173
```

---

# API Endpoints

## Auth

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Admin

### Dashboard

```http
GET /api/admin/dashboard
```

### Create User

```http
POST /api/admin/users
```

### Get Users

```http
GET /api/admin/users
```

### Create Store

```http
POST /api/admin/stores
```

### Get Stores

```http
GET /api/admin/stores
```

---

## User

### Get Stores

```http
GET /api/stores
```

### Submit Rating

```http
POST /api/stores/:storeId/rating
```

### Update Rating

```http
PUT /api/stores/:storeId/rating
```

### My Ratings

```http
GET /api/stores/my-ratings
```

---

## Store Owner

### Dashboard

```http
GET /api/store-owner/dashboard
```

### Ratings

```http
GET /api/store-owner/ratings
```

---

# Default Roles

```text
ADMIN
USER
STORE_OWNER
```

---

# Running Complete Application

## Terminal 1

```bash
cd backend
npm run dev
```

## Terminal 2

```bash
cd frontend
npm run dev
```

Open:

```text
Frontend:
http://localhost:5173

Backend:
http://localhost:5000
```

---

# Future Improvements

- Pagination
- Advanced Filtering
- Email Verification
- Password Reset
- Dashboard Charts
- Responsive Mobile UI
- Docker Support
- Unit Testing
- Integration Testing

---

Full Stack Web Application built using:

- React.js
- Express.js
- PostgreSQL
- Node.js