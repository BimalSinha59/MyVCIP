# MyVCIP

A 1:1 collaborative platform for mock technical interviews and pair programming. Two developers join a shared session and get live video, a session-scoped text chat, and a Monaco code editor with server-side code execution — all in one resizable, three-panel workspace.

**[Live Application →](https://interview-prep-platfrom-project.onrender.com)**

---

## What it does

- Create or join a live coding session as Host or Participant
- Video call your partner in real time via the Stream Video SDK — no third-party app needed
- Write code in a Monaco editor (the same engine that powers VS Code) with multi-language support (JavaScript, Python, C++)
- Execute code server-side via the JDoodle API — runtime errors and compilation failures are detected and surfaced cleanly, without leaving the page
- Chat in a session-scoped text channel that slides in alongside the video feed
- Track past and active sessions from a dashboard with difficulty badges and timestamps
- Share an invite link so a partner can join your open session in one click

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
└─────────┼────────────────┼─────────────────┼─────────┘
          │                │                 │
          ▼                ▼                 ▼
   Stream Servers    Stream Servers    JDoodle API
   (Video/WebRTC)    (Chat/WS)     (Server-side execution)

                          │
          ┌───────────────▼──────────────┐
          │   Node.js + Express Backend  │
          │  (Session lifecycle + auth)  │
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
                          │
               ┌──────────▼──────────┐
               │       Inngest       │
               │  (Webhook events /  │
               │   user sync jobs)   │
               └─────────────────────┘
```

**Deployment:** Frontend and backend both hosted on Render (single monorepo build)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS v4, DaisyUI, React Router v7 |
| Code Editor | Monaco Editor (VS Code's editor engine) |
| Video & Chat | Stream Video React SDK, Stream Chat React SDK |
| Code Execution | JDoodle API (server-side, sandboxed — JS, Python, C++) |
| Backend | Node.js, Express.js v5 |
| Database | MongoDB Atlas, Mongoose |
| Auth | Clerk (user management + JWT tokens) |
| Event Queue | Inngest (async Clerk webhook handlers for user sync) |
| Deployment | Render (monorepo — single build, single start command) |

---

## Running locally

### Prerequisites
- Node.js v18+
- A MongoDB Atlas URI
- A [Clerk](https://clerk.com) account (free tier works)
- A [Stream](https://getstream.io) account for Video + Chat API keys
- A [JDoodle](https://www.jdoodle.com) account for the Compiler API
- An [Inngest](https://www.inngest.com) account (for local dev server, optional)

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
NODE_ENV=development
MONGODB_URI=your_mongodb_uri
CORS_ORIGIN=http://localhost:5173

INNGEST_EVENT_KEY=your_inngest_ek
INNGEST_SIGNING_KEY=your_inngest_sk

CLERK_SECRET_KEY=your_clerk_sk
CLERK_PUBLISHABLE_KE=your_clerk_pk

STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret

JDOODLE_API_URL=jdoodle_api_uri
JDOODLE_CLIENT_ID=your_jdoodle_client_id
JDOODLE_CLIENT_SECRET=your_jdoodle_client_secret
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
   status: "active"  ──── another user joins via link ────▶  session.participant set
                                                                      │
                                                            Stream call + chat channel
                                                            both initialized for both users
                                                                      │
                                                               host ends session
                                                                      │
                                                                      ▼
                                                           status: "completed"
                                                       (Stream call + channel deleted,
                                                        session locked read-only)
```

---

## Code execution flow

```
User clicks "Run Code"
        │
        ▼
Frontend → POST /api/execute-code  { language, code }
        │
        ▼
Backend proxies to JDoodle API (server holds credentials)
        │
        ├── statusCode 429 → daily limit reached → surfaced to user
        ├── output contains error strings → returned as { success: false, error }
        └── clean output → returned as { success: true, output }
        │
        ▼
OutputPanel renders result with pass/fail styling
```

Supported languages: `javascript` (Node.js 18), `python` (Python 3), `cpp` (C++17)

---

## Known limitations and future improvements

- **Collaborative editing is not synchronised:** Both users share the same Monaco editor, but edits aren't synced in real time between them. True co-editing would require a CRDT library like Yjs with a WebSocket provider — the most impactful next feature.
- **Render cold starts:** The backend on Render's free tier spins down after inactivity. First load after idle can take 30–60 seconds. A paid tier or a keep-alive ping would fix this.
- **JDoodle daily limit:** The free JDoodle plan allows a fixed number of executions per day. The backend intercepts the 429 status and surfaces a clear error to the user.
- **No session recording:** Sessions end with no playback. Adding recording via Stream's built-in recording API would make this more useful for async review.
- **Two participants only:** The session model is hardcoded for 1:1. Multi-participant support would require rethinking the role model and Stream call configuration.

---

## Author

**Bimal Kumar** — B.Tech Information Technology, NIT Raipur

[GitHub](https://github.com/BimalSinha59) · [LinkedIn](https://www.linkedin.com/in/bimal-sinha-36a7462ba/) · [LeetCode](https://leetcode.com/Bimalsinha)
