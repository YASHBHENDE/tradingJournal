import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"


const app = express()
app.use(express.json())







app.listen(3001,()=>{
    console.log("listening on port 3001")
})