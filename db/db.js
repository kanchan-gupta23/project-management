const mongoose = require("mongoose")
const URI = process.env.MONGODB_URL

const connectDB=async ()=>{
    try {
        await mongoose.connect(URI)
        console.log("database connected successfully")

        
    } catch (error) {
        console.log(error," database do not connected successfully ")
        process.exit(1)
    }
}

module.exports= connectDB

