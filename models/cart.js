import mongoose from "mongoose";

//const cartSchema = mongoose.Schema;

const cartItemSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      default: 1
    }
    
  });
  const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [cartItemSchema],
});
  
  const CartModel = mongoose.model('CartItem', CartSchema);
  export default CartModel; 

 
    