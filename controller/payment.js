import PaymentModel from "../models/payment.js";

export const postPaymentData = async (req, res) => {
    try {
      const {amount,method,status,cart,user} = req.body;
  
  
      const newPayment = new PaymentModel({amount,method,status,cart,user});
      const savedPayment = await newPayment.save();
  
     return  res.status(201).json({
      message:"Payment Added successfully",
      success:true,
      data:savedPayment,

     });
   
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  /*
   //Get Payment without Id
   export const getPayments = async(req,res)=>{
    try{
      //console.log(req.user.name)
      const payment = await PaymentModel.find();
      res.status(200).json(order);

    }catch(error){
      res.status(500).json({message:error.message});
    }
  };*/
  export const getPayments = async (req, res) => {
    try {
      // Fetch all payment records from the database
      const payment = await PaymentModel.findOne();
      
      // Send the retrieved payments as the response
      return res.status(200).json({
        message: "Payments retrieved successfully",
        success: true,
        data: payment
      });
      
    } catch (error) {
      // Handle any errors that occur during the database query
      return res.status(500).json({
        message: error.message
      });
    }
  };



  //Update the payment
  export const updatePayment = async (req, res) => {
    try {
      // Extract the payment ID from the request parameters
      const paymentId = req.params.id;
  
      // Extract updated payment data from the request body
      const updateData = req.body;
  
      // Find the payment by ID and update it with the provided data
      const updatedPayment = await PaymentModel.findByIdAndUpdate(paymentId, updateData, { new: true });
  
      if (!updatedPayment) {
        return res.status(404).json({
          message: "Payment not found",
          success: false
        });
      }
  
      // Send the updated payment as the response
      return res.status(200).json({
        message: "Payment updated successfully",
        success: true,
        data: updatedPayment
      });
  
    } catch (error) {
      // Handle any errors that occur during the update
      return res.status(500).json({
        message: error.message
      });
    }
  };
