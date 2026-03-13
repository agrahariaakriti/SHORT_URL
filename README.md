# ShortLink 🚀

[ShortLink](https://github.com/your-username/shortlink) is a modern, fast, and secure URL shortener application built with **React**, **Node.js/Express**, and **Redis**. It allows users to shorten long URLs, track analytics, and manage links with an elegant and responsive interface.  

This project implements **JWT authentication**, **rate limiting**, and **Redis caching** to ensure high performance and security.

---

## Features ✨

- **Shorten URLs instantly** – Convert long URLs into compact, shareable links.  
- **User Authentication** – Secure login and signup using **JWT**.  
- **Rate Limiting** – Prevents abuse using **Redis-based rate limiting**.  
- **Caching** – Redis caching ensures fast retrieval of previously shortened URLs.  
- **Copy & Redirect** – Easily copy short URLs or redirect directly to the original link.  
- **Responsive UI** – Built with **React** and **Tailwind CSS**, works on desktop and mobile.  
- **Analytics Ready** – Can be extended to track clicks and link performance.  

---

## Tech Stack 🛠️

| Layer | Technology |
|-------|------------|
| Frontend | React, React Router, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Cache & Rate Limiting | Redis |
| Authentication | JWT (HTTP-only cookies) |
| Deployment | Can deploy on Vercel/Netlify (frontend), Render/Heroku (backend) |

---

## Project Structure 📁
URL_SHORTENER
│
├── Backend
│   │
│   ├── src
│   │   ├── config        # Redis & environment configuration
│   │   ├── controllers   # Request handling logic
│   │   ├── DB            # MongoDB connection setup
│   │   ├── middleware    # Authentication & other middleware
│   │   ├── model         # MongoDB models
│   │   ├── routes        # Express API routes
│   │   └── services      # Business logic layer
│   │
│   ├── index.js          # Backend entry point
│   ├── server.js         # Express server configuration
│   └── package.json
│
├── Frontend
│   │
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── pages         # React pages (Home, Signin, Signup, Shortener)
│   │   ├── stores        # Axios API instance
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md



---

## Screenshots 🖼️


---

## Installation & Setup ⚡

### Prerequisites    
- Node.js >= 18.x
- MongoDB installed or MongoDB Atlas account
- Redis server running locally or on a cloud provider
- Git

### Clone the repository
```bash
git clone https://github.com/your-username/shortlink.git
cd URL_SHORTENER
