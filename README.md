📘 Howladar Prokasoni – Frontend

A production-ready Next.js (App Router) frontend for the Howladar Prokasoni Online Bookstore.
The frontend integrates tightly with the backend API and includes full authentication, payments, cart system, dashboards, category & author pages, server actions, secure API routing, and a modern UI using Shadcn/UI.

🔗 Live Website: https://howladarporkasoni.vercel.app

🔗 Backend API: https://howladar-prokasoni-server.vercel.app

📑 Table of Contents

Introduction

Tech Stack

Key Features

Authentication Flow

Public Pages

Dashboard Features

Checkout & Payment

Folder Structure

State Management

API Handling

Installation

Run Locally

Demo Video (optional)

License

🧾 Introduction

This is a complete full-stack bookstore frontend built with Next.js App Router and secure communication with a TypeScript-based backend.

The frontend includes:

Custom JWT authentication with secure cookies

Fully responsive UI using Shadcn UI

Server Actions for form handling

Complete cart system

Category & author based book pages

Store Manager & Admin dashboards

SSLCommerz payment integration

Proxy-based API routing

SEO optimized dynamic metadata

🧰 Tech Stack
Frontend

Next.js (App Router)

TypeScript

Tailwind CSS

Shadcn UI

Server Components + Client Components

React Hook Form

Zod Validation

Context API

Next.js Server Actions

Dynamic Metadata SEO

Auth & Security

Custom JWT cookie-based authentication

HTTP-Only cookies

Private & public route guards

proxy.ts for secure server-side API calls

🌟 Key Features
🚀 1. Fully Responsive UI

Optimized for mobile, tablet, and desktop

Modern, clean UI powered by Shadcn UI

🔐 2. Authentication

Login / Register

Logout

Secure JWT cookies

Middleware-based route protection

User info loaded using server components

Protected routes:

/dashboard/customer

/dashboard/store-manager

/dashboard/admin

🛍 3. Shopping Cart

Add to cart

Remove items

Update quantity

Global CartContext

Cart persists after login

Cart badge shown in navbar

📚 4. Books Module

Book listing

Filtering

Search

Dynamic book details

Multiple image preview

Show discount, stock, genre, author, etc.

🏷 5. Categories & Authors Pages
Public Pages

/categories → list all categories

/authors → list all authors

Dynamic Pages

/category/:id → books of selected category

/author/:id → books of selected author

🎨 6. Banner Module

Homepage banners managed by Admin

Fully integrated with Cloudinary via backend

🛒 7. Cart & Checkout

Cart page

Checkout summary

Order details

Order history

💳 8. Payment (SSLCommerz)

Payment flow:

User proceeds to checkout

Frontend calls /payment/init via proxy

Redirects to SSLCommerz gateway

On completion → success/fail/cancel pages

Order details stored in dashboard

Works 100% with backend SSLCommerz module.

📊 9. Dashboard System
Customer Dashboard

View profile

Order list

Order details

Manage cart

Store Manager Dashboard

Add books

Edit books

Delete books

Manage stock

Manage all books

Admin Dashboard

Manage genres

Manage authors

Manage banners

View statistics

Site control

🧭 Folder Structure

Based on your provided screenshot:

src/
 ├── app/
 │   ├── (commonLayout)/
 │   ├── (dashboardLayout)/
 │   ├── error.tsx
 │   ├── layout.tsx
 │   ├── not-found.tsx
 │   ├── globals.css
 │   └── favicon.ico
 │
 ├── components/
 │   ├── module/
 │   ├── shared/
 │   ├── ui/
 │   └── MultipleImageUploader.tsx
 │
 ├── config/
 ├── constant/
 ├── context/
 │    └── cartContext.tsx
 │
 ├── data/
 ├── hooks/
 ├── lib/
 ├── services/
 ├── types/
 ├── utils/
 ├── zodSchema/
 └── proxy.ts

🔐 Authentication Flow (Frontend)

User submits login/register form (Server Action)

Backend sends JWT cookie

Cookie stored securely as HTTP-only

Middleware checks protected routes

Unauthorized users are redirected to /login

🛍 Checkout & Payment Flow

User checks out from cart

Frontend calls backend init payment

Redirect to SSLCommerz

After payment → success/fail/cancel URLs

Order stored in database

User can view order in Dashboard

⚙ API Handling (proxy.ts)

All API calls are made via secure server-side routing:

export const api = async (path: string, options: any = {}) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`,
    options
  );
};


Benefits:

No CORS issues

Secure API communication

Works perfectly with cookies

🧠 State Management
CartContext

Add item

Remove item

Update quantity

Persist cart

User State

Loaded via secure server components

Used in navbar & dashboard

🛠 Installation
git clone https://github.com/your-username/howladar-prokasoni-frontend.git
cd howladar-prokasoni-frontend
npm install

▶ Run Locally
npm run dev

🎥 Demo Video (Optional)

You can add your video later:

[Watch Demo Video](YOUR_VIDEO_LINK_HERE)

📄 License

This project is licensed under the MIT License.