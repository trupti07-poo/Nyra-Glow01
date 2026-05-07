# ✨ Nyra Glow — Spa & Salon Booking Web App
> "Glow beyond beauty"

## Project Structure
```
nyra-glow/
├── client/   # React + Vite frontend
├── server/   # Node.js + Express backend
└── README.md
```

## Environment Setup

### Backend (server/.env)
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/nyraglow
JWT_SECRET=your_jwt_secret_key_here
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
ADMIN_EMAIL=admin@nyraglow.com
```

### Frontend (client/.env)
```
VITE_API_URL=http://localhost:5000
```

## Run Instructions

### Backend
```bash
cd server && npm install && npm run server
```

### Frontend
```bash
cd client && npm install && npm run dev
```

## Deployment
- Frontend → Vercel (set VITE_API_URL to your Render URL)
- Backend → Render (add all env vars)

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Framer Motion, AOS
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Auth: JWT + bcrypt
- Email: Nodemailer

## WhatsApp: https://wa.me/919353231012
