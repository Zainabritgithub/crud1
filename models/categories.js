import mongoose from "mongoose";

const categorySchema = mongoose.Schema;
const category = new categorySchema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
   
},{
    timestamps:true,
}
);

const CategoryModel = mongoose.model("Category", category);
export default CategoryModel;
