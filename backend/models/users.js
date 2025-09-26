import mongoose from "mongoose"
const Schema=mongoose.Schema

const user=new Schema({
    email:{type:String,unique:true},
    password:String,
    name:String
})

const userModel=mongoose.model('users',user)

export default userModel