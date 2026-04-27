# MyStore - Shopping SPA

A modern E-Commerce Single Page Application built with Vue 3, TypeScript, and Tailwind CSS.
Data is fetched from [DummyJSON](https://dummyjson.com) REST API.

## Features

- Product grid with search and category filtering
- Product detail page with image gallery
- Shopping cart with quantity controls (persists on reload)
- JWT Authentication simulation (Login/Logout)
- Dark mode toggle (persists on reload)
- Fully responsive (Mobile, Tablet, Desktop)

## Tech Stack

- Vue 3 (Composition API)
- TypeScript
- Vite
- Tailwind CSS v4
- Pinia (state management)
- Vue Router 4

## Installation

1. Clone the repository:
   git clone https://github.com/UpekshaWijerathe/MyShoppingCart.git

2. Navigate to the project folder:
   cd MyShoppingCart

3. Install dependencies:
   npm install

4. Run the development server:
   npm run dev

5. Open your browser at:
   http://localhost:5173

## Test Credentials

Use these credentials to test the login feature:
- Username: emilys
- Password: emilyspass

## API

This project uses [DummyJSON](https://dummyjson.com) for all data:
- GET /products
- GET /products/category/:category
- GET /products/search?q=query
- GET /products/:id
- POST /auth/login