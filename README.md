# 💬 Real-Time Chatroom

A secure, real-time chat application built with React, TypeScript, and WebSocket. Features end-to-end encryption, rate limiting, and XSS protection.

## ✨ Features

- 🔐 **Secure WebSocket (WSS)** - Encrypted communication
- 🚦 **Rate Limiting** - 4 msg/sec + 60 msg/min per user
- 🛡️ **XSS Protection** - DOMPurify input sanitization
- 💾 **Message History** - Last 100 messages stored
- 🌓 **Dark Mode** - Theme toggle with localStorage
- 📱 **Responsive Design** - Works on desktop and mobile
- 👥 **Real-time** - Instant message delivery

## 🛠️ Tech Stack

### Frontend
- React + TypeScript
- Vite
- WebSocket
- CSS

### Backend
- Node.js + Express
- WebSocket
- DOMPurify + JSDOM

## 📋 Prerequisites

- Node.js
- npm or yarn
- Modern web browser

## 🛠️ Setup Guide:
1. Clone and Install
```bash
git clone https://github.com/hamidrezaesh/chatroom-app.git
cd chatroom-app
cd server && npm install
cd ../client && npm install
```

2. Build and Run
```bash
cd client && npm run build
cd ../server && npm start
```
Then open `http://localhost:8080` in browser.

### Development Mode
```bash
cd server && npm run dev   # Backend (auto-reload)
cd client && npm run dev   # Frontend (hot-reload)
```

### SSL Certificates (For WSS)
```bash
cd server
mkdir ssl-certs
openssl req -x509 -newkey rsa:4096 -keyout ssl-certs/key.pem -out ssl-certs/cert.pem -days 365 -nodes -subj "/CN=localhost"
```

# 📄 License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
