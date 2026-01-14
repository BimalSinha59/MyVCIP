# MyVCIP

A real-time collaborative coding platform that enables developers to practice coding problems together with **live video calls**, **integrated chat**, and **in-browser code execution**. The platform is designed for pair programming, mock interviews, and collaborative problem solving.

---

## 🚀 Features

### 🔴 Live Coding Sessions

* Create and join **live coding sessions**
* Each session supports **up to 2 participants** (Host + Participant)
* Real-time session status: **Open / Full / Active / Completed**

### 🎥 Video Calling (Stream Video SDK)

* High-quality **real-time video conferencing**
* Automatic join/leave handling
* Participant count tracking
* Speaker-focused video layout

### 💬 Real-time Chat (Stream Chat)

* Session-specific chat rooms
* Persistent messaging during sessions
* Threaded conversations support

### 🧠 Coding Environment

* Multi-language support (JavaScript, Python, etc.)
* Monaco-based code editor
* Language-specific starter code
* Execute code directly using **Piston API**
* Output panel for results and errors

### 📊 Dashboard & Analytics

* View **active sessions** in real time
* Track **past sessions** with timestamps
* Difficulty badges (Easy / Medium / Hard)
* Live participant indicators

### 🔐 Authentication & Authorization

* Secure authentication using **Clerk**
* Role-based access control (Host vs Participant)
* Session auto-join for eligible users

---

## 🏗️ Tech Stack

### Frontend

* **React + Vite**
* **Tailwind CSS** + DaisyUI
* **Lucide Icons**
* **React Router**
* **React Resizable Panels**

### Real-time Services

* **Stream Video React SDK** (Video calls)
* **Stream Chat React SDK** (Messaging)

### Backend / APIs

* Session management APIs
* **Piston API** for code execution
* Stream token generation API

### Database

* MongoDB
  

### Authentication

* **Clerk** (User management & auth)

---

## 🧩 Core Concepts

### Session Lifecycle

1. User creates a session (Host)
2. Another user joins as Participant
3. Video call + chat initialized automatically
4. Both users collaborate on the same problem
5. Host ends the session → status set to `completed`

### Stream Client Management

* Singleton Stream Video client
* Automatic cleanup on session leave
* Shared call ID for video + chat synchronization

### Auto Join Logic

* If user is neither host nor participant → auto-join
* Prevents infinite loops using controlled effects

---


## 🛠️ Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🧪 Code Execution

The platform uses **Piston API** to execute user code:

* Stateless execution
* Supports multiple languages
* Secure sandboxed environment

---

## 📌 UI Highlights

* Responsive split panels (Editor / Output / Video)
* Smooth resizing with drag handles
* Loading & error states for all async flows
* Professional dashboard cards and badges

---

## 🔒 Security Considerations

* Authenticated Stream tokens
* Session access restricted to participants
* Cleanup of video/chat connections on unmount

---

## 🧭 Future Enhancements

* Multi-participant sessions
* Real-time collaborative editing (CRDT)
* Session recording & playback
* Leaderboards & performance stats
* Voice-only fallback mode

---


## ⭐ Acknowledgements

* Stream (Video & Chat SDKs)
* Clerk Authentication
* Piston Code Execution Engine
* Open-source community

---

> This project demonstrates a production-grade real-time collaborative system combining video, chat, and coding workflows in a single unified experience.
