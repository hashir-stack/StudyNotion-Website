const Tag = require("../models/tag");

// create tage controller...
exports.createTag = async ( req , res ) =>{
    try {
      // fetch the data from the request body
      const { name, description } = req.body;

      // validation
      if (!name || !description) {
        return res.status(401).json({
          success: false,
          message: "Please fill the required feilds...",
        });
      }

      // create the entry in the db
      const tagDetails = await Tag.create({
        name,
        description,
      });

      res.status(200).json({
        success: true,
        message: "Your tag is created successfully...",
        data: tagDetails,
      });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Some issue in creating the tag....please try again..."
        });
    }
}

// searching all the tags...
exports.showAllTags = async ( req , res )=>{
    try {
        // find all the tags from the db
        const allTags = await Tag.find({},{ name:true, description:true});
        res.status(200).json({
            success: true,
            message:"Successfully fetched all the tags...",
            data: allTags
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Some issue in finding the all tags..."
        });
    }
}