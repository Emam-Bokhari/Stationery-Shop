# Project Name

Welcome to the **Stationery Shop** repository! This document provides an overview of the project, setup instructions.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Project Setup](#project-setup)
   - [Environment Variables](#environment-variables)
3. [Architecture Overview](#architecture-overview)
   - [Folder Structure](#folder-structure)
   - [System Design](#system-design)
4. [Features](#features)
5. [Modules Overview](#modules-overview)
6. [Database Details](#database-details)
7. [Development Standards](#development-standards)
8. [Deployment](#deployment)
9. [Contact](#contact)

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
npm run dev
```

### Environment Variables

Create a `.env` file with the following keys:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb+srv://stationery-shop:k9CEPeB3t3soFJRb@cluster0.kndeci6.mongodb.net/stationery-shop-DB?retryWrites=true&w=majority&appName=Cluster0
```

---

## 3. Architecture Overview

### Folder Structure

```bash
├── dist/
│   ├── app/
│   ├── app.js
│   └── server.js
├── src/
│   ├── app/
│   │   ├── config/
│   │   └── modules/
│   │   │   ├── order/
│   │   │   │   ├── order.controller.ts
│   │   │   │   ├── order.interface.ts
│   │   │   │   ├── order.model.ts
│   │   │   │   ├── order.route.ts
│   │   │   │   ├── order.service.ts
│   │   │   │   └── order.validation.ts
│   │   │   ├── product/
│   │   │   │   ├── product.controller.ts
│   │   │   │   ├── product.interface.ts
│   │   │   │   ├── product.model.ts
│   │   │   │   ├── product.route.ts
│   │   │   │   ├── product.service.ts
│   │   │   │   └── product.validation.ts
│   ├── app.ts
│   └── server.ts
├── .gitignore
├── .prettierignore
├── .prettierrc
├── .README.md
├── .eslint.config.mjs
├── .package-lock.json
├── .package.json
├── .tsconfig.json
└── .vercel.json
```
