const Category = require("../models/category");
const mongoose = require("mongoose");

// create the category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const CategorysDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log(CategorysDetails);
    return res.status(200).json({
      success: true,
      message: "Categorys Created Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: true,
      message: error.message,
    });
  }
};

// show all the category
exports.showAllCategories = async (req, res) => {
  try {
    const allCategorys = await Category.find({});

    res.status(200).json({
      success: true,
      data: allCategorys,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// pageDetails
// exports.categoryPageDetails = async (req, res) => {
// 	try {
// 		const { categoryId } = req.body;

// 		// Get courses for the specified category
// 		const selectedCategory = await Category.findById(categoryId)
// 			.populate("courses")
// 			.exec();
// 		console.log(selectedCategory);
// 		// Handle the case when the category is not found
// 		if (!selectedCategory) {
// 			console.log("Category not found.");
// 			return res
// 				.status(404)
// 				.json({ success: false, message: "Category not found" });
// 		}
// 		// Handle the case when there are no courses
// 		if (selectedCategory.courses.length === 0) {
// 			console.log("No courses found for the selected category.");
// 			return res.status(404).json({
// 				success: false,
// 				message: "No courses found for the selected category.",
// 			});
// 		}

// 		const selectedCourses = selectedCategory.courses;

// 		// Get courses for other categories
// 		const categoriesExceptSelected = await Category.find({
// 			_id: { $ne: categoryId },
// 		}).populate("courses");
// 		let differentCourses = [];
// 		for ( const category of categoriesExceptSelected ) {
// 			differentCourses.push(...category.courses);
// 		}

// 		// Get top-selling courses across all categories
// 		const allCategories = await Category.find().populate("courses");
// 		const allCourses = allCategories.flatMap((category) => category.courses);
// 		const mostSellingCourses = allCourses
// 			.sort((a, b) => b.sold - a.sold) //this is for decsending order
// 			.slice(0, 10); // this is for the sorting the top 10 courses

// 		res.status(200).json({
// 			selectedCourses: selectedCourses,
// 			differentCourses: differentCourses,
// 			mostSellingCourses: mostSellingCourses,
// 		});
// 	} catch (error) {
// 		return res.status(500).json({
// 			success: false,
// 			message: "Internal server error",
// 			error: error.message,
// 		});
// 	}
// };
// exports.categoryPageDetails = async (req, res) => {
//     try {
//       const { categoryId } = req.body
//       console.log("PRINTING CATEGORY ID: ", categoryId);
//       // Get courses for the specified category
//       const selectedCategory = await Category.findById(categoryId)
//         .populate({
//           path: "courses",
//           match: { status: "Published" },
//           populate: "ratingAndReview",
//         })
//         .exec()

//       //console.log("SELECTED COURSE", selectedCategory)
//       // Handle the case when the category is not found
//       if (!selectedCategory) {
//         console.log("Category not found.")
//         return res
//           .status(404)
//           .json({ success: false, message: "Category not found" })
//       }
//       // Handle the case when there are no courses
//       if (selectedCategory.courses.length === 0) {
//         console.log("No courses found for the selected category.")
//         return res.status(404).json({
//           success: false,
//           message: "No courses found for the selected category.",
//         })
//       }

//       // Get courses for other categories
//       const categoriesExceptSelected = await Category.find({
//         _id: { $ne: categoryId },
//       })
//       let differentCategory = await Category.findOne(
//         categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
//           ._id
//       )
//         .populate({
//           path: "courses",
//           match: { status: "Published" },
//         })
//         .exec()
//         //console.log("Different COURSE", differentCategory)
//       // Get top-selling courses across all categories
//       const allCategories = await Category.find()
//         .populate({
//           path: "courses",
//           match: { status: "Published" },
//           populate: {
//             path: "instructor",
//         },
//         })
//         .exec()
//       const allCourses = allCategories.flatMap((category) => category.courses)
//       const mostSellingCourses = allCourses
//         .sort((a, b) => b.sold - a.sold)
//         .slice(0, 10)
//        // console.log("mostSellingCourses COURSE", mostSellingCourses)
//       res.status(200).json({
//         success: true,
//         data: {
//           selectedCategory,
//           differentCategory,
//           mostSellingCourses,
//         },
//       })
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "Internal server error",
//         error: error.message,
//       })
//     }
//   }

// exports.categoryPageDetails = async (req, res) => {
//   try {
//     const { categoryId } = req.body;
//     console.log("Received categoryId:", categoryId);

//     // Validate categoryId
//     if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid categoryId",
//       });
//     }

//     // Fetch selected category with published courses and reviews
//     const selectedCategory = await Category.findById(categoryId)
//       .populate({
//         path: "courses",
//         match: { status: "Published" },
//         populate: { path: "ratingAndReview" },
//       })
//       .exec();

//     if (!selectedCategory) {
//       return res.status(404).json({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     console.log("Selected category:", selectedCategory);

//     if (!Array.isArray(selectedCategory.courses) || selectedCategory.courses.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "No published courses found for the selected category",
//       });
//     }

//     // Fetch a random different category with published courses
//     const otherCategories = await Category.find({ _id: { $ne: categoryId } });
//     let differentCategory = null;

//     if (otherCategories.length > 0) {
//       const randomIndex = getRandomInt(otherCategories.length);
//       differentCategory = await Category.findById(otherCategories[randomIndex]._id)
//         .populate({
//           path: "courses",
//           match: { status: "Published" },
//         })
//         .exec();
//     }

//     // Fetch top-selling published courses across all categories
//     const allCategories = await Category.find().populate({
//       path: "courses",
//       match: { status: "Published" },
//       populate: { path: "instructor" },
//     });

//     const allCourses = allCategories.flatMap((cat) => cat.courses);
//     const mostSellingCourses = allCourses
//       .sort((a, b) => (b.sold || 0) - (a.sold || 0))
//       .slice(0, 10);

//     // Final response
//     return res.status(200).json({
//       success: true,
//       data: {
//         selectedCategory,
//         differentCategory,
//         mostSellingCourses,
//       },
//     });
//   } catch (error) {
//     console.error("Error in getCategoryPageDetails:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// exports.categoryPageDetails = async (req, res) => {
//   try {
//     const { categoryId } = req.body;
//     console.log("PRINTING CATEGORY ID: ", categoryId);
//     // Get courses for the specified category
//     const selectedCategory = await Category.findById(categoryId)
//       .populate({
//         path: "courses",
//         match: { status: "Published" },
//         populate: {
//           path: "ratingAndReview",
//         },
//       })
//       .exec();

//     console.log("SELECTED COURSE", selectedCategory);

//     // const rawCategory = await Category.findById(categoryId);
//     // console.log("🧾 Raw category:", rawCategory);

//     // Handle the case when the category is not found
//     if (!selectedCategory) {
//       console.log("Category not found.");
//       return res
//         .status(404)
//         .json({ success: false, message: "Category not found" });
//     }
//     // Handle the case when there are no courses
//     if (selectedCategory.courses.length === 0) {
//       console.log("No courses found for the selected category.")
//       return res.status(404).json({
//         success: false,
//         message: "No courses found for the selected category.",
//       })
//     }

//     // if (selectedCategory.courses.length === 0) {
//     //   return res.json({
//     //     success: true,
//     //     data: {
//     //       selectedCategory,
//     //       differentCategory: null,
//     //       mostSellingCourses: [],
//     //     },
//     //     message: "No courses found for the selected category.",
//     //   });
//     // }

//     // Get courses for other categories
//     const categoriesExceptSelected = await Category.find({
//       _id: { $ne: categoryId },
//     });
//     let differentCategory = await Category.findOne(
//       categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
//         ._id
//     )
//       .populate({
//         path: "courses",
//         match: { status: "Published" },
//       })
//       .exec();
//     console.log("Different COURSE", differentCategory);
//     // Get top-selling courses across all categories
//     const allCategories = await Category.find()
//       .populate({
//         path: "courses",
//         match: { status: "Published" },
//         populate: {
//           path: "instructor",
//         },
//       })
//       .exec();
//     const allCourses = allCategories.flatMap((category) => category.courses);
//     const mostSellingCourses = allCourses
//       .sort((a, b) => b.sold - a.sold)
//       .slice(0, 10);
//     console.log("mostSellingCourses COURSE", mostSellingCourses);

//     // console.log(`selectedCategory : 
//     //             differentCategory : 
//     //             mostSellingCourses : `);

//     res.status(200).json({
//       success: true,
//       data: {
//         selectedCategory,
//         differentCategory,
//         mostSellingCourses,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//       error: error.message,
//     });
//   }
// };
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    console.log("📦 Requested Category ID:", categoryId);

    // 1. Fetch selected category with published courses and reviews
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        // populate: { path: "ratingAndReview" },
      });
      
      console.log("Selected Course :" , selectedCategory)

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (!selectedCategory.courses.length) {
      return res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory: null,
          mostSellingCourses: [],
        },
        message: "No published courses in this category",
      });
    }

    // 2. Pick a different category with published courses
    const otherCategories = await Category.find({ _id: { $ne: categoryId } });
    const randomIndex = getRandomInt(otherCategories.length);
    const differentCategoryId = otherCategories[randomIndex]?._id;

    let differentCategory = null;
    if (differentCategoryId) {
      differentCategory = await Category.findById(differentCategoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
        });
    }

    // 3. Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: { path: "instructor" },
      });

    const allCourses = allCategories.flatMap(cat => cat.courses);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);


      console.log( selectedCategory ,"selectedCategory",
        differentCategory, "differentCategory",
        mostSellingCourses,"mostSellingCourses");
        
    // 4. Return response
    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
    

  } catch (error) {
    console.error("❌ Error in categoryPageDetails:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
