import mongoose from "mongoose";

const orderSchema = mongoose.Schema;

const order = new orderSchema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   /* items: [orderItemSchema], // Array of order items
    totalAmount: {
        type: Number,
        required: true
    },*/
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    shippingAddress: {
        type: String,
        required: true
    },
    billingAddress: {
        type: String,
        required: true
    }
}, {
    timestamps: true 
});


const OrderModel = mongoose.model("Order", order);
export default OrderModel;




