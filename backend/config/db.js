import mongoose from "mongoose"
const connect =async()=>{
   await  mongoose.connect("mongodb+srv://02911ashish_db_user:Ashish123@cluster0.divsc4j.mongodb.net/todo")
   console.log("MongoDB connected");
   
}

export default connect;