const { categories } = require('../../src/services/api');
const Category = require('../models/Category');
const Tags=require('../models/Category');
const { validate } = require('../models/Couse');

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

exports.createCategory=async(req,res)=>{
    try{
        //fetch data
        const{TagsName,TagsDescription}=req.body;

        //validation
        if(!TagsName || !TagsDescription){
            return res.status(401).json({
                success:false,
                message:"Pls Fill the All Tags Information"
            })
        }

        //create entry in db
        

        const tagsDetails=await Tags.create({
            TagsName,TagsDescription
        });

        console.log(tagsDetails);

        return res.status(201).json({
            success:true,
            data:tagsDetails,
            message:"Tags Created SuccessFully"
        })

    }catch(err){
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"Tags Creation Failed"
        })
    }
}


exports.getAllCategory=async (req,res)=>{
    try{

        const AllTags=await Category.find();
        

        return res.status(201).json({
            success:true,
            data:AllTags,
            message:"Tags Fetched SuccessFully"
        })

    }catch(err){
        return res.status(501).json({
            success:false,
            data:err.message,
            message:"Tags Fetch Failed"
        })
    }
}

exports.categoryPageDetails=async(req,res)=>{
    try{
        //get categoryId
        
        const {categoryId}=req.query;
       
        //get courses for specified categoryId
        
        const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "Course",
        match: { Status: "Published" },
        populate: "Review",
      })
      .exec()

    console.log("SELECTED COURSE", selectedCategory)
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }
    // Handle the case when there are no courses
    if (selectedCategory.Course.length === 0) {
      console.log("No courses found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No courses found for the selected category.",
      })
    }// Get courses for other categories
    const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "Course",
          match: { Status: "Published" },
        })
        .exec()
      console.log()
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "Course",
          match: { status: "Published" },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.Course)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
  
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}