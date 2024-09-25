import ProductModel from "../models/product.js";

export const postProductData = async (req, res) => {
    try {
      const { name, description, price, category, quantity } = req.body;
  /*console.log(req.body,name)
      if (!name || !description || !price || !category || !quantity) {
        return res.status(400).json({ message: "Please fill all fields" });
      }
  
      const isProductExisted = await ProductModel.findOne({ name });
      if (isProductExisted) {
        return res.status(400).json({ message: "Product is already existed" });
      }*/
  
      const newProduct = new ProductModel({ name, description, price, category, quantity });
      const savedProduct = await newProduct.save();
  
     return  res.status(201).json({
      message:"Product Added successfully",
      success:true,
      data:savedProduct,

     });
   
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //GET PRODUCT
 export const getProducts = async(req,res)=>{
    try{
      console.log(req.user.name)
      const products = await ProductModel.find();
      res.status(200).json(products);

    }catch(error){
      res.status(500).json({message:error.message});
    }
  };

  //DELETE PRODUCT
  export const delProducts = async(req,res)=>{
    try{
      const userid = req.params.id;
      if(!userid){
        return res.status(400).json({message:"Please provide product ID"});
      }
      const isProductExisted = await ProductModel.findById(userid);
      if(!isProductExisted){
        return res.status(404).json({message:"Product not found"});
      }
      await ProductModel.findByIdAndDelete(userid);
      res.status(200).json({message:"Product deleted successfully"});
    }catch(error){
      res.status(500).json({message:error.message});
    }
  };

  //UPDATE PRODUCT
  export const updateProduct = async (req,res)=>{
    try{
      const userid = req.params.id;
      if(!userid){
        return res.status(400).json({message:"Please provide productID"});
      }
      const isProductExisted = await ProductModel.findById(userid);
      if(!isProductExisted){
        return res.status(404).json({message:"Product not found"});
      }
      const {name,description,price,category,quantity} = req.body;
      if(!name || !description || !price || !category || !quantity){
        return res.status(400).json({message:"Please fill all fields"});
      }
      const updatedProduct = await ProductModel.findByIdAndUpdate(userid,{
        name,
        description,
        price,
        category,
        quantity,
      },{new : true});
      res.status(200).json(updatedProduct);
    }catch(error){
      res.status(500).json({message:error.message});
    }
  };