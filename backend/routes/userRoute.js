import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/users.js";
import bcrypt from "bcrypt"
import {z} from "zod"

const router=express.Router()
const JWT_SECRET = "random";

router.post("/signup",async (req,res)=>{
    try{
    const requireBody=z.object({
      email:z.string().min(3).email(),
      name:z.string().max(50),
      password:z.string().min(6).max(100)
    })
    const parsedData=requireBody.safeParse(req.body)
    if(!parsedData.success){
        res.json({
          message:parsedData.error
        })
    }
    const hashedPass=await bcrypt.hash(password,5);
    await userModel.create({
      email,
      password:hashedPass,
      name
    })
      res.json({
           message:"You are signed up"
    })
    }

    catch(err){
        res.json("user already exists")
    }
   
})

router.post("/signIn", async(req,res)=>{
    const {email,password}=req.body
    const user=await userModel.findOne({
      email:email
    })
    if(!user){
      res.status(401).json({
        message:"user not exists"
      })
    }

    const passMatch=bcrypt.compare(password,user.password)

    console.log(user)
    if(passMatch){
      const token= jwt.sign({
        id:user._id.toString()
      },JWT_SECRET)
      res.json({
        message:token
      })
    }
    else{
      res.status(401).json({
        message:"incorrect credentials"
      })
    }
})

export default router


//zod => used for input validation