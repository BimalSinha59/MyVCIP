import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

dotenv.config({
    path: './.env',
    quiet:true // does not show the env variable information on terminal
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

app.use("/api/inngest", serve({
    client: inngest,
    functions
}));

app.get("/health", (req,res) => {
    res.status(200).json({msg: "aoi is up and running"});
})
app.get("/books", (req,res) => {
    res.status(200).json({msg: "this is the books endpoint"})
})

//make our app ready for production

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "../Frontend", "dist", "index.html"))
    })
}

export { app }