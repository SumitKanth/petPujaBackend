import express from "express";
import userRouter from "./routes/user.js";
import {config} from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";


export const app = express();

config({
    path: "./database/config.env",
});


// middleware 
app.use(express.json());  // For getting req.body data
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3000', 'https://petpuja-backend.onrender.com'],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use("/api/v1/user", userRouter);

export default app