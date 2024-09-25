import express from "express";
import { getOrders, getOrdersById, postOrderData } from "../controller/order.js";

const orderroute = express.Router();
orderroute.post('/post/order', postOrderData);
orderroute.get('/get/order',getOrders);
orderroute.get('/get/order/:id', getOrdersById);
export default orderroute;