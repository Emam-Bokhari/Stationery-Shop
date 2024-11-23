# Stationery Shop

Welcome to the **Stationery Shop** repository! This document provides an overview of the project, and setup instructions.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Project Setup](#project-setup)
   - [Environment Variables](#environment-variables)
3. [Architecture Overview](#architecture-overview)
   - [Folder Structure](#folder-structure)
   - [Application Architecture](#application-architecture)
4. [Features](#features)
5. [API Modules Overview](#api-modules-overview)
6. [Database Details](#database-details)
7. [Development Standards](#development-standards)
8. [Contact](#contact)

---

## Introduction

This project is a **stationery shop e-commerce site** built using **Node.js**, **Express.js**, **Mongoose**, and **TypeScript** following a **modular monolithic architecture**.

### Key Features:

- **Product Module:** Manages the product add, update, delete, and retrieve products.

- **Order Module:** Handles order placement, stock updates, and calculate revenue.

### Tech Stack:

- **Backend:** Node.js, Express.js, Mongoose, TypeScript

- **Database:** MongoDB

---

## Getting Started

### Project Setup

1. **Clone the repository:**

```bash
git clone https://github.com/Emam-Bokhari/Stationery-Shop.git

cd Stationery-Shop

```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the server:**

```bash
npm run start:dev
```

### Environment Variables

Create a `.env` file with the following keys:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb+srv://stationery-shop:k9CEPeB3t3soFJRb@cluster0.kndeci6.mongodb.net/stationery-shop-DB?retryWrites=true&w=majority&appName=Cluster0
```

---

## Architecture Overview

### Folder Structure

```bash
├── dist/                                             # Complied Code
│   ├── app/
│   ├── app.js
│   └── server.js
├── src/                                              # Source code
│   ├── app/                                          # Main application logic
│   │   ├── config/                                   # Configurations
│   │   └── modules/                                  # Modularized application features
│   │   │   ├── order/                                # Order module
│   │   │   │   ├── order.controller.ts
│   │   │   │   ├── order.interface.ts
│   │   │   │   ├── order.model.ts
│   │   │   │   ├── order.route.ts
│   │   │   │   ├── order.service.ts
│   │   │   │   └── order.validation.ts
│   │   │   ├── product/                              # Product module
│   │   │   │   ├── product.controller.ts
│   │   │   │   ├── product.interface.ts
│   │   │   │   ├── product.model.ts
│   │   │   │   ├── product.route.ts
│   │   │   │   ├── product.service.ts
│   │   │   │   └── product.validation.ts
│   ├── app.ts                                        # Application entry point
│   └── server.ts                                     # Main server file
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .README.md                                        # Documentation file
├── .eslint.config.mjs
├── .package-lock.json
├── .package.json
├── .tsconfig.json                                    # TypeScript configuration file
└── .vercel.json                                      # Configuration file for deploying
```

### Application Architecture:

Each module is feature-specific, containing:

1. **Controller:** Responsible for handling incoming requests (`req`) and sending appropriate responses (`res`).

2. **Interface:** Defines types and interfaces using `TypeScript` for strong type-checking.

3. **Model:** Creates and manages `Mongoose models` for MongoDB collections.

4. **Service:** Contains the business `logic` for the application.

5. **Route:** Defines endpoints grouped by feature modules.

6. **Validation:** Uses `Zod` for validating user input to ensure data integrity.

---

## Features

1. **Product Management:**

   - **Add Product:** Ability to add new products to the inventory.

   - **Update Product:** Edit product details such as name, price, description, and stock.

   - **Delete Product:** Remove products from the inventory.

   - **Find All Products:** Retrieve a list of all products.

   - **Find Product by ID:** Retrieve product details by its unique identifier.

2. **Order Management:**

   - **Create Order**: Customers can place orders for products.

   - **Calculate Revenue:** The system automatically calculates the total revenue generated from orders.

---

## API Modules Overview

### Product API Module

- **Description:** Handle product related operations

- **Endpoints:**
  - `GET /api/products`
  - `GET /api/products/:productId`
  - `POST /api/products`
  - `PUT /api/products/:productId`
  - `DELETE /api/products/:productId`

### Order API Module

- **Description:** Order related operations

- **Endpoints:**
  - `POST /api/orders`
  - `GET /api/orders/revenue`

---

## Database Details

**MongoDB Collections:**

1. **products:** Stroe products data.

2. **orders:** Store orders data

---

## Development Standards

### Linting & Formatting

- **ESLint:** Enforces coding standards.

- **Prettier:** Ensures consistent formatting.

```bash
npm run lint
npm run format
```

### Commit Message

- `feat`: Introduces new features..
- `fix`: Resolves bugs.
- `config`: Updates configurations or settings.
- `docs`: Updates or adds documentation.

---

## Contact

Any queries, contact with me:

- **Email:** moshfiqurrahman37@gmail.com
- **Whats App:** [Contact Me on WhatsApp](https://wa.me/+8801315773424)

- **Phone:** +880 131 57-73 424
