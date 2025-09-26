import express from "express";
import jwt from "jsonwebtoken";
import userModel from "./models/users.js";
import auth from "./auth/auth.middleware.js"
import connect from "./config/db.js"
import todosModel from "./models/todos.js";
import cors from "cors"
const JWT_SECRET = "random";
const app = express();
app.use(express.json());
app.use(cors());

app.post("/signup",async (req,res)=>{
    const {email,password,name}=req.body
    await userModel.create({
      email,
      password,
      name
    })

    res.json({
      message:"You are logged in"
    })
})

app.post("/signIn", async(req,res)=>{
    const {email,password}=req.body
    const user=await userModel.findOne({
      email:email,
      password:password
    })
    console.log(user)
    if(user){
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

app.post("/todo",auth,async(req,res)=>{
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

app.get("/todos",auth,(req,res)=>{
  res.json(todosModel.title)

})

app.listen(3000, () => {
  console.log(`listening on http://localhost:3000`);
  connect();
});
