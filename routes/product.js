import express from "express";
import {delProducts, getProducts, postProductData, updateProduct} from "../controller/product.js";
import { authentication } from "../middleware/middleware.js";

const productroute = express.Router();
productroute.post('/post/product', postProductData);
productroute.get('/get/product',authentication,getProducts);
productroute.delete('/del/product/:id',delProducts);
productroute.put('/put/product/:id',updateProduct);

export default productroute;
 