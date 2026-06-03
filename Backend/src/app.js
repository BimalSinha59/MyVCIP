import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from '@clerk/express';
import { ApiResponse } from "../src/utils/ApiResponse.js"
import chatRoutes from "./routes/chatRoutes.js"
import sessionRoutes from "./routes/sessionRoutes.js";
import compilerRouter from './routes/compiler.js';

dotenv.config({
    path: './.env',
    quiet:true
})

const app = express();

const __dirname = path.resolve();

// middlewares

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true //=> server allows a browser(frontend) to include cookies on request
}));
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(clerkMiddleware()); //=> this adds auth field to request object: req.auth()

app.get("/health", (req,res) => {
    res.status(200).json(
        new ApiResponse(200, {}, "api is up and running")
    )
})

app.use("/api/inngest", serve({
    client: inngest,
    functions
}));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);
app.use('/api', compilerRouter);

//make our app ready for production

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"))
    })
}

export { app }