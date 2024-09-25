import mongoose from "mongoose";

const paymentSchema = mongoose.Schema;

const payment = new paymentSchema({
    amount:{
        type:Number,
        required:true
    },
    method:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'Pending'
    },
    cart: [
        {
          product_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          quantity: {
            type: Number,
            required: true
          }
        }
      ],
      user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
      },
   /* cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cart'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }*/

},{
    timestamps:true,
});


const PaymentModel = mongoose.model("Payment", payment);
export default PaymentModel;
