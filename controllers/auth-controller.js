const express = require ("express")



const User = require("../db/userSchema");
const cloudinary = require("cloudinary").v2;  // Ensure you have .v2

const registration = async (req, res) => {
    try {
        // Log the incoming files
        console.log("Request Body:", req.body); // Log request body
        // console.log("Files:", req.files); // Should show the uploaded files

        // // Check if files exist
        // if (!req.files || !req.files.avatar) {
        //     return res.status(400).json({ msg: "No avatar uploaded" });
        // }

        // const { avatar } = req.files;// Get the uploaded avatar file
        // const allowedFormats = ["image/jpg", "image/png", "image/avif", "image/webp"];

        // Validate the file type
        // if (!allowedFormats.includes(avatar.mimetype)) {
        //     return res.status(400).json({ msg: "Invalid file type" });
        // }

        // const cloudinaryResponse = await cloudinary.uploader.upload(filePath, {
        //     folder: 'avatars',
        //     use_filename: true,
        //     resource_type: 'image',
        // });
        // // Check for Cloudinary upload success
        // if (!cloudinaryResponse) {
        //     return res.status(400).json({ msg: "Image could not be uploaded" });
        // }

        // Destructure other fields from the request body
        const { username, email, phone, password } = req.body;

        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ msg: "User already exists" });
        }

        // Create new user
        const usercreate = await User.create({
            username,
            email,
            phone,
            password,
            // avatar: {
            //     public_id: cloudinaryResponse.public_id,
            //     url: cloudinaryResponse.secure_url,
            // },
        });

        // Generate token and respond
        return res.status(200).json({ usercreate, token: await usercreate.generateToken() });
    } catch (error) {
        console.error("Error in registration:", error); // Log any errors
        return res.status(500).json({ msg: "Internal server error" });
    }
};




const login = async (req,res)=>{
    try {
        const {email,password}= req.body
        
        const userExist = await User.findOne({ email });
               if (!userExist){
                return res.status(400).json({msg:"user dont not exist"})
                  }
              
                  const compare = await userExist.comparePassword(password);
                  if(!compare){
                    return res.status(400).json({msg:"invalid credentials"})
        
                }
                res.status(200).json({msg:userExist,token: await userExist.generateToken(), user_ID:userExist._id})
        
    } catch (error) {
        console.log(error)
        
    }
}
const logout = async(req,res)=>{

}
const user = async(req,res)=>{
    

    try {
        const userData = await req.user
        if (userData){
            console.log(userData)
    res.status(200).json(userData)

        }
     
        
        
    } catch (error) {
        console.log(error)
    }
}




module.exports = { registration, login, logout,user };  
