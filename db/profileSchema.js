const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        public_id:{type:String,
            required:true},
            url:{
                type:String,
        required:true
            }
        
    },
    phone:{
        type:String,
        required:true
    },
  
  
})

const Profile =  mongoose.model("Profile", profileSchema)
module.exports = Profile