import express from "express"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import auth from './auth/sign-in-out';

const app = express()
app.use(express.json())


app.use('/auth',auth)




app.listen(3001,()=>{
    console.log("listening on port 3001")
})