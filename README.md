# 🛒 eStore – Full Stack E‑Commerce App  
Angular Frontend + Express Backend + MySQL + Stripe Checkout

A complete e‑commerce application with a **modern Angular frontend**, a **Node.js + Express backend**, **MySQL database**, and **Stripe Checkout** integration for payments.

---

## 📂 Project Structure

estore-app/
├── backend/ # Express backend (Node.js + MySQL)
│ ├── routes/ # API routes (users, products, orders, etc.)
│ ├── controllers/ # Business logic
│ ├── models/ # DB Models / queries
│ ├── db/ # DB config and connection pool
│ ├── middleware/ # Auth / validation middleware
│ ├── .env # Backend environment variables
│ └── server.js # Entry point
│
├── frontend/ # Angular application
│ ├── src/
│ │ └── app/ # Components, services, routing, etc.
│ ├── angular.json
│ └── .env # Frontend environment variables (if needed)

## 🚀 Features

### Frontend (Angular)
- Responsive UI (Tailwind CSS)
- Category browsing & keyword search
- Add to cart, update quantity, remove items
- Delivery form with validation
- Stripe Checkout redirect flow
- Past orders for authenticated users
- Accessibility support (ARIA, keyboard nav)

### Backend (Node.js + Express + MySQL)
- REST API for users, products, orders
- Authentication via token stored in localStorage
- Persistent cart & order handling
- Stripe Checkout session creation
- Environment‑configurable MySQL connection

---

## 💳 Stripe Integration Flow
- User fills delivery address and proceeds to checkout.
- App saves form + cart in `localStorage` and redirects to **Stripe Checkout**.
- After payment success:
  - User is redirected back to Angular app.
  - Delivery info is restored.
  - Order saved to MySQL database.
  - Cart cleared.
- Past orders can be viewed after login.
