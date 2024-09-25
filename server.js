import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import bodyParser from "body-parser";
import route from "./routes/user.js";
import productroute from "./routes/product.js";
import categoryroute from "./routes/category.js";
import orderroute from "./routes/order.js";
import cartroute from "./routes/cart.js";
import paymentroute from "./routes/payment.js";



const app = express();

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))
app.get("/get", (req,res)=>{
    res.send("api response got")
})


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));






//here paste the code
app.use('/uploads', express.static('uploads'));
dotenv.config()

let port = process.env.PORT;

app.use(express.json());

app.use('/api/v1', route);
app.use('/api/v1', productroute);
app.use('/api/v1', categoryroute);
app.use('/api/v1', orderroute);
app.use('/api/v1', cartroute);
app.use('/api/v1', paymentroute);
connectDb();



app.listen(port, ()=>{
    console.log("Server is started", port)
})