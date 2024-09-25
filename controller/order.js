import OrderModel from "../models/order.js";

export const postOrderData = async (req, res) => {
    try {
      const {  userId, items, totalAmount, status, shippingAddress, billingAddress} = req.body;
  
  
      const newOrder = new OrderModel({  userId, items, totalAmount, status, shippingAddress, billingAddress});
      const savedOrder = await newOrder.save();
  
     return  res.status(201).json({
      message:"Orders Added successfully",
      success:true,
      data:savedOrder,

     });
   
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //Get Order without Id

  export const getOrders = async(req,res)=>{
    try{
      //console.log(req.user.name)
      const order = await OrderModel.find();
      res.status(200).json(order);

    }catch(error){
      res.status(500).json({message:error.message});
    }
  };

  
  //Get Order with ID
  export const getOrdersById = async(req,res)=> {
    try {
        const order = await OrderModel.findById(req.params.id).populate('userId');
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



