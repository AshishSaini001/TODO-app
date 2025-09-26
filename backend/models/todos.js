import mongoose from "mongoose"
const Schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

const todo=new Schema({
    title:String,
    done:Boolean,
    userId:ObjectId
})

const todosModel=mongoose.model('todos',todo)

export default todosModel