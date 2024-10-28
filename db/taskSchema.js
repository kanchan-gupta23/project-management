const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    task:{
        type:String,
        required:true
    },
   
    name:{
        type:String,
        required:true
    },
    status:{
      type:String,
      enum:["incomplete","completed"],
      default: "incomplete",
      
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    
    creatorId:{
        type:mongoose.Schema.ObjectId,
        required:true
    }
    

})

const Task = mongoose.model("Task",taskSchema)

module.exports = Task