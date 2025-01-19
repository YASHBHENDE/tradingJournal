import express from "express"
import { string, z } from "zod"
import { User } from "../db"

const router = express.Router()

const userZOD  = z.object({
    email:z.string(),
    password:z.string()
})


router.post('/sign-up',async(req,res)=>{
    const  {email,password} = req.body

    const auth = userZOD.safeParse({email,password})

    if(!auth.success){
        res.json({"msg":"invalid credential type"}).status(403)
        return
    }

    const newuser = await User.create({email,password})
    

})