import dotenv from "dotenv"
import connectDB from "./db/dbconnection.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env',
    quiet:true 
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(`⚙️  Server is running at port : ${process.env.PORT || 3000}`);
        })
    })
    .catch((err) => {
        console.log("MongoDB connection failed !!", err);
    })