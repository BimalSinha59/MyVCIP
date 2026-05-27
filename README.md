# MyVCIP

A 1:1 collaborative platform for mock technical interviews and pair programming. Two developers join a shared session and get live video, text chat, and a synchronized code editor with in-browser execution — all in one screen.

**[Live Application →](https://interview-prep-platfrom-project.onrender.com)**

---

## What it does

- Create or join a live coding session as Host or Participant
- Video call your partner in real time via the Stream Video SDK — no third-party app needed
- Write code together in a Monaco editor (the same editor that powers VS Code) with multi-language support
- Execute code instantly in the browser via the Piston API — see output and errors without leaving the page
- Chat in a session-scoped text channel alongside the video and editor
- Track past and active sessions from a dashboard with difficulty badges and timestamps

---

## Architecture

```
┌──────────────────────────────────────────────────────┐
│                React + Vite Frontend                 │
│                                                      │
│  ┌─────────────┐  ┌───────────────┐  ┌───────────┐   │
│  │ Stream Video│  │  Stream Chat  │  │  Monaco   │   │
│  │    SDK      │  │     SDK       │  │  Editor   │   │
│  └──────┬──────┘  └──────┬────────┘  └─────┬─────┘   │
└─────────┼────────────────┼────────────────┼──────────┘
          │                │                │
          ▼                ▼                ▼
   Stream Servers    Stream Servers    Piston API
   (Video/WebRTC)    (Chat/WS)        (Code execution)
          
                          │
          ┌───────────────▼──────────────┐
          │   Node.js + Express Backend  │
          │   (Session lifecycle + auth) │
          └───────────────┬──────────────┘
                          │
               ┌──────────▼──────────┐
               │    MongoDB Atlas    │
               │  (Sessions, Users)  │
               └─────────────────────┘
                          │
               ┌──────────▼──────────┐
               │        Clerk        │
               │  (Auth + identity)  │
               └─────────────────────┘
```

**Deployment:** Both frontend and backend hosted on Render

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite, Tailwind CSS, DaisyUI, React Router |
| Code Editor | Monaco Editor (VS Code's editor engine) |
| Video & Chat | Stream Video SDK, Stream Chat SDK |
| Code Execution | Piston API (sandboxed, multi-language) |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | Clerk (user management + JWT) |
| Deployment | Render (frontend + backend) |

---

## Running locally

### Prerequisites
- Node.js v18+
- A MongoDB Atlas URI
- A [Clerk](https://clerk.com) account (free tier works)
- A [Stream](https://getstream.io) account for Video + Chat API keys

### 1. Clone the repo

```bash
git clone https://github.com/BimalSinha59/MyVCIP.git
cd MyVCIP
```

### 2. Set up the backend

```bash
cd Backend
npm install
```

Create `Backend/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
CLERK_SECRET_KEY=your_clerk_sk
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd ../Frontend
npm install
```

Create `Frontend/.env`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_pk
VITE_STREAM_API_KEY=your_stream_api_key
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## Session lifecycle

```
User creates session
        │
        ▼
   status: "open"  ──── another user joins ────▶  status: "full"
                                                          │
                                                          ▼
                                                   Stream call + chat
                                                   initialized for both
                                                          │
                                                          ▼
                                                  status: "active"
                                                          │
                                               host ends session
                                                          │
                                                          ▼
                                                 status: "completed"
                                              (session locked, read-only)
```

---

## Known limitations and future improvements

- **Collaborative editing is not synchronised:** Both users write in the same Monaco editor, but edits aren't synced in real time between them. Adding true co-editing would require a CRDT library like Yjs with a WebSocket provider — that's the most impactful next feature.
- **Render cold starts:** The backend on Render's free tier spins down after inactivity. First load after idle can take 30–60 seconds. A paid tier or a keep-alive ping would fix this.
- **No session recording:** Sessions end with no playback. Adding recording via Stream's built-in recording API would make this significantly more useful for async review.
- **Two participants only:** The session model is hardcoded for 1:1. Multi-participant support would require rethinking the role model and Stream call configuration.

---

## Author

**Bimal Kumar** — B.Tech Information Technology, NIT Raipur

[GitHub](https://github.com/BimalSinha59) · [LinkedIn](https://www.linkedin.com/in/bimal-sinha-36a7462ba/) · [LeetCode](https://leetcode.com/Bimalsinha)
