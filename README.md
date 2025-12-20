# 📘 Howladar Book Store – Frontend

A production-ready, high-performance web client for the **Howladar Prokasoni Online Bookstore**, built on the modern **Next.js App Router** architecture. This application is designed for scalability, security, and exceptional user experience.

---

## 🔗 Live Deployments

| Resource | URL | Description |
| :--- | :--- | :--- |
| **Live Website** | [https://howladarporkasoni.com.bd](https://howladarporkasoni.com.bd) | The live, user-facing application deployed on Vercel. |
| **Backend API** | [https://howladar-prokasoni-server.vercel.app](https://howladar-prokasoni-server.vercel.app) | The dedicated TypeScript/Express API service. |

---

## 📑 Table of Contents

* [Introduction](#-introduction)
* [Tech Stack](#-tech-stack)
* [Key Features](#-key-features)
* [Authentication & Security](#-authentication--security)
* [Dashboard System](#-dashboard-system)
* [Folder Structure](#-folder-structure)
* [Checkout & Payment Flow](#-checkout--payment-flow)
* [API Handling](#-api-handling)
* [State Management](#-state-management)
* [Installation & Setup](#-installation--setup)
* [License](#-license)

---

## 🧾 Introduction

This project provides a complete full-stack interface for an e-commerce platform. It leverages the **Server/Client Component** paradigm of **Next.js 14+** to achieve fast initial loading, SEO optimization, and secure data handling via server-side routing.

It communicates securely with a TypeScript-based backend and includes features like custom JWT authentication, SSLCommerz payment integration, and comprehensive dashboards.

---

## 🧰 Tech Stack

### Core Framework
* **Next.js (App Router):** For server-side rendering and routing.
* **TypeScript:** For type safety and better developer experience.
* **React:** UI library.

### Styling & UI
* **Tailwind CSS:** Utility-first CSS framework.
* **Shadcn/UI:** Reusable component library.
* **Lucide React:** Icon set.

### Forms & Validation
* **React Hook Form:** Efficient form handling.
* **Zod:** Schema validation.

### State & Data
* **Context API:** Global state management (Cart).
* **Server Actions:** For secure form submissions.

### Security
* **JWT:** Cookie-based authentication.
* **HTTP-Only Cookies:** Secure storage for tokens.
* **Middleware:** Route protection.

---

## 🌟 Key Features

### 🚀 1. Fully Responsive UI
* Mobile-first design approach.
* Modern, clean interface powered by **Shadcn UI**.
* Optimized for mobile, tablet, and desktop screens.

### 🔐 2. Robust Authentication
* Login and Registration via Server Actions.
* Secure **HTTP-Only cookie** storage for JWT.
* Middleware-based route protection for:
    * `customer/dashboard`
    * `store-manager/dashboard`
    * `admin/dashboard`

### 🛍 3. Advanced Shopping Cart
* Global **CartContext** for state management.
* Add, remove, and update quantities instantly.
* Cart data persists after login.
* Real-time cart badge in the navigation bar.

### 📚 4. Book Catalog & Details
* Comprehensive book listing with filtering and search.
* Dynamic details page with multiple image previews.
* Displays stock status, discounts, authors, and genres.

### 🏷 5. Dynamic Category & Author Pages
* **Public Pages:** `/category` and `/authors` lists.
* **Dynamic Routing:**
    * `/category/[id]` -> Shows books for specific category.
    * `/author/[id]` -> Shows books by specific author.

### 🎨 6. Banner Management
* Homepage banners managed dynamically by Admin.
* Integrated with **Cloudinary** via the backend.

---

## 📊 Dashboard System

Three distinct dashboards tailored to specific user roles:

| Dashboard | User Role | Capabilities |
| :--- | :--- | :--- |
| **Customer** | `CUSTOMER` | View profile, track order history, view order details, manage cart. |
| **Store Manager** | `STORE_MANAGER` | Add/Edit/Delete books, manage inventory stock, view all books. |
| **Admin** | `ADMIN` | Manage Genres, Authors, Banners, and view comprehensive site statistics. |

---

## 🧭 Folder Structure

The project follows a clean, modular App Router structure:

```bash
src/
 ├── app/                    # Main routing directory
 │   ├── (commonLayout)/     # Public pages (Home, Shop, etc.)
 │   ├── (dashboardLayout)/  # Protected dashboard routes
 │   ├── error.tsx           # Global error handling
 │   ├── layout.tsx          # Root layout
 │   └── not-found.tsx       # 404 page
 │
 ├── components/             # Reusable UI components
 │   ├── module/             # Feature-specific components
 │   ├── shared/             # Shared components (Navbar, Footer)
 │   └── ui/                 # Shadcn UI primitives
 │
 ├── context/                # React Context providers (Cart)
 ├── services/               # API service functions
 ├── types/                  # TypeScript interfaces
 ├── utils/                  # Helper functions
 ├── zodSchema/              # Zod validation schemas
 └── proxy.ts                # Secure API wrapper

🔐 Authentication Flow
User Submission: User submits Login/Register form via Server Action.

Token Generation: Backend verifies credentials and issues a JWT.

Secure Storage: The token is set as a secure, HTTP-Only cookie.

Route Guard: Next.js Middleware checks this cookie to allow/deny access to protected routes.

Redirect: Unauthorized users are automatically redirected to /login.

🛍 Checkout & Payment Flow
The payment process integrates SSLCommerz via a secure backend proxy:

Initiation: User clicks checkout from the cart.

Proxy Call: Frontend calls /payment/init via proxy.ts.

Gateway: Backend redirects user to the SSLCommerz payment gateway.

Completion:

Success: Redirects to success page, order saved in DB.

Fail/Cancel: Redirects to respective error pages.

History: Order details are immediately available in the User Dashboard.

⚙ API Handling (proxy.ts)
All API calls are routed through a secure server-side utility to manage CORS and cookies effectively.

// Secure wrapper for API calls
export const api = async (path: string, options: any = {}) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}${path}`,
    options
  );
};

Benefits:

Eliminates CORS issues.

Ensures secure server-to-server communication.

Handles cookie transmission automatically.

🛠 Installation & Setup
Prerequisites
Node.js (LTS version)

npm or yarn

1. Clone the Repository
Bash
git clone [https://github.com/your-username/howladar-prokasoni-frontend.git](https://github.com/your-username/howladar-prokasoni-frontend.git)
cd howladar-prokasoni-frontend
2. Install Dependencies
Bash
npm install
3. Environment Variables
Create a .env.local file in the root directory:

Code snippet
# URL of your deployed backend
NEXT_PUBLIC_BACKEND_URL=[https://howladar-prokasoni-server.vercel.app/api/v1](https://howladar-prokasoni-server.vercel.app/api/v1)
4. Run Locally
Bash
npm run dev
The app will be available at http://localhost:3000.

🎥 Demo Video (Optional)
You can watch the full project walkthrough here:

Watch Demo Video

📄 License
This project is licensed under the MIT License.