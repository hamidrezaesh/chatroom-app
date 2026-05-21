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
