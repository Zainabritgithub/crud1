import mongoose from "mongoose";

const productSchema = mongoose.Schema;  
const product = new productSchema({
  name: {
    type: String,
    required: true,
 },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  user:{
    type: productSchema.Types.ObjectId,
    ref:'User'}
   
  
}, {
  timestamps: true,
});

const ProductModel = mongoose.model("Product", product);
export default ProductModel;