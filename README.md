# 💰 Finance Dashboard Backend

## 📌 Overview

This is a backend system for managing financial records with role-based access control and dashboard analytics.

---

## 🚀 Features

* Authentication (JWT + Cookies)
* Role-Based Access Control (Admin, Analyst, Viewer)
* Financial Records CRUD
* Filtering (type, category, date)
* Dashboard Summary (income, expense, category-wise data)
* Swagger API Documentation

---

## 🧠 Tech Stack

* Node.js
* Express.js
* MongoDB (Mongoose)

---

## 📂 Project Structure

controllers/
routes/
models/
middlewares/

---

## 🔐 Roles

* Viewer → View own records
* Analyst → View all records
* Admin → Full access

---

## 📡 API Endpoints

### Auth

POST /auth/register
POST /auth/login

### Records

POST /records
GET /records
PATCH /records/:id
DELETE /records/:id

### Dashboard

GET /dashboard/summary

### Users (Admin)

GET /users
PATCH /users/:id/role
PATCH /users/:id/status

---

## 📊 API Documentation

Visit:
http://localhost:8000/api-docs

---

## ⚙️ Setup Instructions

1. Clone repository
2. Run:
   npm install
3. Create `.env` file
4. Run server:
   npm start

---

## 📌 Assumptions

* Only admin can modify records
* Viewer can only access their own data
* Analyst can view all data

---

## 🚀 Future Improvements

* Pagination
* Monthly analytics
* Rate limiting
* Deployment

---
