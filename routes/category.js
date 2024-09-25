import express from "express";
import { delCategories, getcategories, getcategoriesById, postCategoryData } from "../controller/category.js";

const categoryroute = express.Router();
categoryroute.post('/post/category', postCategoryData);
categoryroute.get('/get/category',getcategories);
categoryroute.delete('/del/category/:id',delCategories);
categoryroute.get('/get/category/:id',getcategoriesById);

export default categoryroute;