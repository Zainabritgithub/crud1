import express from "express";
import { postCartData,getCart} from "../controller/cart.js";

const cartroute = express.Router();
cartroute.post('/post/cart', postCartData);
cartroute.get('/get/:id',getCart);

export default cartroute;