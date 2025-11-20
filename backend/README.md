# Task Manager Backend

Backend for Task Manager (Express + MongoDB + JWT)

Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.

2. Install dependencies:

```
cd backend
npm install
```

3. Run in development:

```
npm run dev
```

API Endpoints

- POST `/api/register` — register user
- POST `/api/login` — login, returns JWT
- POST `/api/tasks` — create task (protected)
- GET `/api/tasks` — list tasks (protected)
- GET `/api/tasks/:id` — get task
- PUT `/api/tasks/:id` — update task
- DELETE `/api/tasks/:id` — delete task

Notes

- Provide `Authorization: Bearer <token>` header for protected routes.
