import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
const app = express();

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))
app.get("/get", (req,res)=>{
    res.send("api response got")
})
dotenv.config()

let port = process.env.PORT;

app.use(express.json());



app.listen(port, ()=>{
    console.log("Server is started", port)
})