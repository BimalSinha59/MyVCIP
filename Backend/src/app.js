import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

dotenv.config({
    path: './.env',
    quiet:true // does not show the env var information on terminal
})

const app = express();

const __dirname = path.resolve();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));

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