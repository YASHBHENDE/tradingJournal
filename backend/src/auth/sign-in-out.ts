import express from "express"
import { string, z } from "zod"
import { User } from "../db"
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config"
import bcrypt  from 'bcrypt'
import { hash } from "../config"
const router = express.Router()

const bycrypthash = hash

const userZOD  = z.object({
    email:z.string(),
    password:z.string()
})

interface user{
    email:string,
    password:string
}

router.post('/sign-up',async(req,res)=>{
    const  {email,password}:user = req.body

    const auth = userZOD.safeParse({email,password})

    if(!auth.success){
        res.json({"msg":"invalid credential type"}).status(403)
        return
    }
    
    const userexists = await User.findOne({email})

    if(userexists){
        res.json({"msg":"user already exists"}).sendStatus(401)
        return
    }

    bcrypt.hash(password, 2,async function(err, hash) {
        const newuser = await User.create({email,hash})
    
        newuser.save()    
        const token = jwt.sign({"userId":newuser._id},JWT_SECRET)
        res.json({
            "msg":"user created successfullly",
            "token":token
        })
    });
})

router.post('/sign-in',async(req,res)=>{
    const {email,password}:user = req.body
    const auth = userZOD.safeParse({email,password})
    if(!auth.success){
        res.json({"msg":"invalid credential type"}).status(403)
        return
    }
    const finduser = await User.findOne({email,password})

    if(!finduser){
        res.json({"msg":"invalid credentials"}).sendStatus(403)
        return
    }


    if (finduser && typeof finduser.password === 'string' && typeof string === 'string'){
        const plainpassword = finduser.password
        bcrypt.compare(plainpassword, hash, function(err, result) {
            if(result){
                const token = jwt.sign({"userid":finduser._id},JWT_SECRET)
                res.json({
                    "token":token
                })
            }
        });
    }
      
})

export default router