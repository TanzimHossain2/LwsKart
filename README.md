# Lwskart

Lwskart is a professional E-commerce application built with Next.js and Tailwind CSS. It serves as the final assignment for the "Rnext" course offered by Learn with Sumit (LWS). You can find the course [here](https://learnwithsumit.com/).

## Table of Contents

- [Challenges & Solutions](#challenges--solutions)
- [Key Features](#key-features)
- [Technologies](#technologies)
- [Installation](#installation)
- [License](#license)

## Challenges & Solutions

- **Challenge 1**: _Authentication & Authorization_
  - **Solution**: Implemented user registration, login, and forgot password functionality. Used Next-Auth for authentication, social media login, email verification, access token & refresh token management, and 2FA (Two-Factor Authentication). Also, implemented protected routes for authenticated users.

- **Challenge 2**: _Database Design_
  - **Solution**: Hard to design a product schema. I have designed a product schema with all the necessary fields and relationships.

## Key Features

- **Database Design**: MongoDB
- **Backend**: Next.js API routes
- **Authentication**:
  - User registration and login
  - Next-Auth for authentication
  - Social media login
  - Email verification
  - Access Token & Refresh Token management
  - Forgot password
  - 2FA (Two-Factor Authentication)
- **User Profile Management**:
  - Edit user profile
  - Update address
- **Product Management**:
  - Add new products (admin)
  - Display all products
  - Product details page
  - Display relevant products
  - Add and remove products from the cart (authenticated user)
  - Wishlist management (authenticated user)
- **Order Management**:
  - Protected routes
  - Checkout process
  - Order history
  - Invoice generation in PDF format
  - Invoice download
  - Email invoice after successful order
- **Additional Features**:
  - Social media sharing
  - Stock management
  - Internationalization
  - Product search (by title, tag, description)
  - Product filtering (by category, price, size)
- **Extra Features**:
   - BreadCrumb Navigation
  - ...and more to be added soon

## Technologies

- Next.js
- TypeScript
- Tailwind CSS
- MongoDB 
- Next-Auth (for authentication)
- React Hook Form (for form validation)
- Zod (for validation)
- Axios (for API requests)
- ...and more to be added soon

## Installation

1. **Prerequisites:**
    - Node.js and npm (or yarn) installed on your system. You can download Node.js from [here](https://nodejs.org/).

2. **Clone the Repository:**

   ```bash
   git clone https://github.com/TanzimHossain2/LwsKart.git
   ```

3. **Install Dependencies:**

   ```bash
   cd LwsKart
   npm install (or yarn install)
   ```

4. **Environment Variables:**

   Create a `.env` file (not included in version control) and set environment variables for database connection, authentication, and other configurations. Refer to the project's documentation (if provided) for specific variable names and values.

5. **Start Development Server:**

   ```bash
   npm run dev (or yarn dev)
   ```

   This will start the development server, typically accessible at `http://localhost:3000` by default.

6. **Build for Production:**

   ```bash
   npm run build (or yarn build)
   ```

   This creates an optimized production build that can be deployed to a hosting platform.

7. **Deployment:**

   Follow the deployment instructions specific to your hosting provider. Common options include Vercel, Netlify, or custom server configurations.


## License

_(To be filled)_