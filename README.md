# Product Management Backend

A Node.js + Express + TypeScript backend API with JWT authentication.

## Features

- JWT-based authentication with HTTP-only cookies
- TypeScript for type safety
- RESTful API endpoints
- CORS enabled

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/nafisnihal/product-management-backend.git
cd product-management-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

**Environment Variables:**

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 5000)
- `JWT_SECRET` - Secret key for JWT token generation (change in production!)
- `JWT_EXPIRES_IN` - JWT token expiration time (e.g., 7d, 24h, 60m)
- `FRONTEND_URL` - Frontend application URL for CORS

## Running the Application

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify authentication
- `POST /api/auth/logout` - User logout
- `GET /api/health` - Health check

## Demo Credentials

- Email: `admin@demo.com`
- Password: `admin123`

## Project Structure

```
product-management-backend/
├── src/
│   ├── controllers/
│   │   └── auth.controller.ts   # Authentication logic
│   ├── middleware/
│   │   └── auth.ts              # JWT verification middleware
│   ├── routes/
│   │   └── auth.routes.ts       # Authentication routes
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── utils/
│   │   └── jwt.ts               # JWT utility functions
│   ├── app.ts                   # Express app configuration
│   └── server.ts                # Server entry point
├── .env                         # Environment variables (DO NOT COMMIT!)
├── .gitignore
├── nodemon.json                 # Nodemon configuration
├── package.json
├── tsconfig.json                # TypeScript configuration
└── README.md
```

## Technologies Used

- Node.js & Express.js
- TypeScript
- JWT Authentication
- Cookie Parser
- CORS
