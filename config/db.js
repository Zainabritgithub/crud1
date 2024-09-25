import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let isConnected = false;
let url = process.env.MONGO_URL;

async function connectDb(){
    if(isConnected) return;
    //Exception Handling
    try{
        await mongoose.connect(url)
        isConnected = true;
        console.log("Database connected.")
    }
    catch(error){
        console.log("Error connecting to database",error);
    }
}
export default connectDb;