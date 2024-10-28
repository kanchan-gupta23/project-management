const Task = require("../db/taskSchema")
const createTask = async(req,res)=>{
    try {
        const {title,task,createdAt} = req.body 
        const creatorId= req._id
        const name = req.user.username
       
        const taskCreate = await Task.create({title,task,createdAt,name,creatorId})
        res.status(200).json(taskCreate)
        
    } catch (error) {
        console.log(error); 
        
    }
}

const deleteTask = async (req,res) => {
    try {
        const {id} = req.params
        const task = await Task.findById(id)
        if(!task){
            return res.status(400).json({msg:"task not found"})
                    }
        await task.deleteOne()
        res.status(200).json({msg:"task deleted successfully"})
        
    } catch (error) {
        console.log(error);
        
    }
    
}
const updateTask = async (req,res) => {
   try {
    const {id} = req.params
    const taskData = req.body
    const task = await Task.findByIdAndUpdate(id,{$set: taskData},{new:true})
    if(!task){
        return res.status(400).json({msg:"task not found"})
    }
    res.status(200).json({msg:"updated successfully",task})
    
   } catch (error) {
    console.log(error);
  console.log(error);  
    
   }
    
}
const getMyTask = async (req, res) => {
    try {
        const userId =  req._id; // Ensure correct field from authentication middleware

        if (!userId) {
            return res.status(401).json({ msg: "Unauthorized: User ID not found" });
        }

        // Find tasks specific to the authenticated user
        const tasks = await Task.find({ creatorId: userId });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ msg: "No tasks found for this user" });
        }

        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching user-specific tasks:", error);
        res.status(500).json({ msg: "An error occurred while retrieving tasks" });
    }
};


const getSingleTask = async (req,res) => {
try {
    const {id}= req.params
    const task = await Task.findOne({_id : id})
    if(!task){
 return res.status(400).json({msg:"task not found"})
        }
        res.status(200).json(task)
        
    
    
} catch (error) {
    console.log(error);
    
} }

const toggelStatus = async (req,res)=>{
    try {
        const {id} = req.params
        
        const task = await Task.findById(id)
        const updateStatus = await task.status==="incomplete"?"completed":"incomplete"
        task.status = updateStatus
        await task.save();
        res.status(200).json(task);

        
    } catch (error) {
        console.log(error);
        
        
    }
}



const mongoose = require('mongoose');

const getFilteredTask = async (req, res) => {
    const { userId, status } = req.query;

    // Validate userId format
    if (!userId || !/^[0-9a-fA-F]{24}$/.test(userId)) {
        return res.status(400).json({ message: "Invalid User ID format." });
    }

    try {
        // Build the filter criteria
        const filterCriteria = { creatorId: new mongoose.Types.ObjectId(userId) };

        if (status) {
            // Trim whitespace and split by comma to allow for multiple statuses
            const statuses = status.trim().split(",").map(s => s.trim());

            // Use $in operator to match any of the statuses
            filterCriteria.status = { $in: statuses }; 
        }

        console.log("Filter Criteria:", filterCriteria); // Log filter criteria

        const tasks = await Task.find(filterCriteria);
        
        console.log("Tasks Fetched:", tasks); // Log the tasks fetched

        if (tasks.length === 0) {
            console.log("No tasks found for the provided criteria.");
            return res.status(404).json({ message: "No tasks found." });
        }

        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error fetching filtered tasks:", error);
        res.status(500).json({ message: "Failed to fetch tasks", error });
    }
};



  

module.exports = {createTask, deleteTask, updateTask , getMyTask,getSingleTask,toggelStatus, getFilteredTask}

