import express from "express";
import connect from "./config/db.js"
import cors from "cors"
import userRouter from "./routes/userRoute.js";
import todoRouter from "./routes/todoRoute.js"
import auth from "./auth/auth.middleware.js";


const app = express();

app.use(express.json());
app.use(cors());


app.use("/api",userRouter)
app.use(auth)
app.use("/api",todoRouter)

app.listen(3000, () => {
  console.log(`listening on http://localhost:3000`);
  connect();
});
