# Product Management Backend

A Node.js + Express + TypeScript backend API for the Product Management Dashboard with JWT authentication and Firebase Firestore integration.

## 🚀 Features

- JWT-based authentication with HTTP-only cookies
- Firebase Firestore integration
- TypeScript for type safety
- RESTful API endpoints
- CORS enabled for cross-origin requests
- Secure cookie handling

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Firebase Account](https://firebase.google.com/) with a project created

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd product-management-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. Navigate to **Project Settings** → **Service Accounts**
4. Click **Generate New Private Key**
5. Save the downloaded JSON file as `serviceAccountKey.json` in the root directory of this project

**Important:** Never commit `serviceAccountKey.json` to version control!

### 4. Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
COOKIE_DOMAIN=localhost
```

**Environment Variables:**
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)
- `JWT_SECRET` - Secret key for JWT token generation (change in production!)
- `JWT_EXPIRES_IN` - JWT token expiration time (e.g., 7d, 24h, 60m)
- `FRONTEND_URL` - Frontend application URL for CORS
- `COOKIE_DOMAIN` - Cookie domain (use your domain in production)

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:5000` with hot-reloading enabled.

### Production Build

```bash
# Build TypeScript to JavaScript
npm run build

# Run production server
npm start
```

### Clean Build

```bash
# Remove compiled files
npm run clean
```

## 📡 API Endpoints

### Health Check

```http
GET /api/health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-12-02T10:30:00.000Z"
}
```

### Authentication

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@demo.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "demo-user-123",
    "email": "admin@demo.com",
    "name": "Demo Admin"
  }
}
```

**Note:** Sets HTTP-only cookie with JWT token

#### Verify Authentication

```http
GET /api/auth/verify
Cookie: token=<jwt-token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "demo-user-123",
    "email": "admin@demo.com",
    "name": "Demo Admin"
  }
}
```

#### Logout

```http
POST /api/auth/logout
Cookie: token=<jwt-token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

## 🔐 Demo Credentials

For testing purposes, use these credentials:

- **Email:** `admin@demo.com`
- **Password:** `admin123`

## 🧪 Testing the API

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@demo.com","password":"admin123"}' \
  -c cookies.txt -v
```

**Verify:**
```bash
curl http://localhost:5000/api/auth/verify \
  -b cookies.txt
```

**Logout:**
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -b cookies.txt
```

### Using Postman or Thunder Client

1. Set request type to `POST`
2. URL: `http://localhost:5000/api/auth/login`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "email": "admin@demo.com",
  "password": "admin123"
}
```
5. Check cookies after successful login

## 📁 Project Structure

```
product-management-backend/
├── src/
│   ├── config/
│   │   └── firebase.ts          # Firebase configuration
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
├── serviceAccountKey.json       # Firebase service account (DO NOT COMMIT!)
├── .env                         # Environment variables (DO NOT COMMIT!)
├── .gitignore
├── nodemon.json                 # Nodemon configuration
├── package.json
├── tsconfig.json                # TypeScript configuration
└── README.md
```

## 🔒 Security Notes

- JWT tokens are stored in HTTP-only cookies to prevent XSS attacks
- CORS is configured to only allow requests from the frontend URL
- Service account keys should never be committed to version control
- Change `JWT_SECRET` in production to a strong, random string
- Use HTTPS in production for secure cookie transmission

## 🚨 Troubleshooting

### Port Already in Use

If port 5000 is already in use:
```bash
# Change PORT in .env file
PORT=5001
```

### Firebase Connection Issues

- Verify `serviceAccountKey.json` is in the root directory
- Check Firebase project settings
- Ensure Firestore database is created in your Firebase project

### CORS Errors

- Verify `FRONTEND_URL` in `.env` matches your frontend URL
- Check that `credentials: true` is set in frontend fetch requests

### Cookie Not Being Set

- Ensure `COOKIE_DOMAIN` matches your domain
- In production, set `secure: true` and use HTTPS
- Check that frontend includes `credentials: 'include'` in requests

## 📦 Dependencies

### Production
- `express` - Web framework
- `cors` - CORS middleware
- `cookie-parser` - Cookie parsing
- `jsonwebtoken` - JWT authentication
- `firebase-admin` - Firebase Admin SDK
- `dotenv` - Environment variable management

### Development
- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution
- `nodemon` - Auto-restart on file changes
- `@types/*` - TypeScript type definitions