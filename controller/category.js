import CategoryModel from "../models/categories.js";

export const postCategoryData = async (req, res) => {
    try {
      const { name, description} = req.body;
  
  
      const newCategory = new CategoryModel({ name, description});
      const savedCategory = await newCategory.save();
  
     return  res.status(201).json({
      message:"Categories Added successfully",
      success:true,
      data:savedCategory,

     });
   
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

//GET Category without id
  export const getcategories = async(req,res)=>{
    try{
      //console.log(req.user.name)
      const category = await CategoryModel.find();
      res.status(200).json(category);

    }catch(error){
      res.status(500).json({message:error.message});
    }
  };

   //DELETE category
   export const delCategories = async(req,res)=>{
    try{
      const userid = req.params.id;
      if(!userid){
        return res.status(400).json({message:"Please provide category ID"});
      }
      const isCategoryExisted = await CategoryModel.findById(userid);
      if(!isCategoryExisted){
        return res.status(404).json({message:"Category not found"});
      }
      await CategoryModel.findByIdAndDelete(userid);
      res.status(200).json({message:"Category deleted successfully"});
    }catch(error){
      res.status(500).json({message:error.message});
    }
  };


  //GET Categories By Id
  export const getcategoriesById = async(req,res)=>{
    try{ const category = await CategoryModel.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  };

  //Update
  /*
  export const updateCatgory = async (req,res)=>{
    try{
      const userid = req.params.id;
      if(!userid){
        return res.status(400).json({message:"Please provide categoryID"});
      }
      const isCategoryExisted = await CategoryModel.findById(userid);
      if(!isCategoryExisted){
        return res.status(404).json({message:"Product not found"});
      }
      const {name,description} = req.body;
      if(!name || !description ){
        return res.status(400).json({message:"Please fill all fields"});
      }
      const updatedCategory = await  CategoryModel.findByIdAndUpdate(userid,{
        name,
        description,
        
      },{new : true});
      res.status(200).json(updatedCategory);
    }catch(error){
      res.status(500).json({message:error.message});
    }
  };
*/

