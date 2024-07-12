import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectToMongo from "./db/connectToMongo.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";


const PORT = process.env.PORT || 5000
const app=express();


dotenv.config();


// app.get("/",(req,res) =>
// {
//     res.send("HELLO WWWORLD")
// })

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.use("/api/users",userRoutes)


app.listen(PORT, () =>{
    connectToMongo()
    console.log("running successfully") 

} )