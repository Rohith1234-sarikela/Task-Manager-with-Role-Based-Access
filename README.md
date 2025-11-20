# Task Manager with Role-Based Access

Full-stack MERN example with:
- Node + Express backend with JWT auth, roles, and MongoDB (Mongoose)
- React frontend (Vite) with Register/Login/Dashboard

Quick setup

1. Backend

```
cd backend
copy .env.example .env
# Edit .env and paste your MongoDB connection string as MONGO_URI and set JWT_SECRET
notepad .env
npm install
npm run dev
```

2. Frontend

```
cd frontend
npm install
npm run dev
```

Notes
- The API base is `http://localhost:5000/api`.
- Auth token is stored in `localStorage` as `token`.
- The user will paste their MongoDB connection string into `.env` (MONGO_URI) as requested.
