import mongoose from "mongoose";

const userSchema =mongoose.Schema;
const user = new userSchema({
    name:{
    type: String,
    required: true,
    },
    email:{
        type: String,
        required: true,
     },
     password:{
        type: String,
        required: true,
        minlength: [8,"atleast 8 characters required"],
    },
    image:{
        type:String,
        required:false
    },
    resetPasswordToken: { type: String },
        resetPasswordExpire: { type: Date }

},{
    timestamps:true,
}
);
const Usermodel = mongoose.model("User", user);
export default Usermodel;
