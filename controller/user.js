import Usermodel from "../models/user.js";

export const createUser=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name||!email||!password){
            return res.status(400).json({message:"Please fill all fields"});
        }
        const isEmailExisted=await Usermodel.findOne({email});
            if(isEmailExisted){
                return res.status(400).json({message:"Email is already existed"});
            }
        
        const newUser=new Usermodel({name,email,password}); //verify from model
        const savedUser=await newUser.save();  //after verify save data
        return res.status(201).json(savedUser);
         //show data in json form also got data

    }
    catch(error){
        res.status(500).json({message:error.message});
    }
};



