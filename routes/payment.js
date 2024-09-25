import express from "express";
import { getPayments, postPaymentData, updatePayment } from "../controller/payment.js";

const paymentroute = express.Router();
paymentroute.post('/post/payment', postPaymentData);
paymentroute.get('/payment',getPayments);
paymentroute.put('/payment/:id',updatePayment);
export default paymentroute;