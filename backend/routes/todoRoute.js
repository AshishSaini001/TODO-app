import express from "express";
import auth from "../auth/auth.middleware.js"
import todosModel from "../models/todos.js";


const router=express.Router()

router.post("/todo",auth,async(req,res)=>{
  const userId=req.userId;
  const title=req.body.title
  todosModel.create({
    userId:userId,
    title:title
  })
  res.json({
    meassage:"Todo added"
  })

})

router.get("/todo",auth,(req,res)=>{

})


export default router