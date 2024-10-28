const mongoose = require ("mongoose")
const jwt = require ("jsonwebtoken")
const bcrypt = require("bcryptjs")
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,  
    },
    phone:{
        type:String,
        required:true
    },
  
    password:{
        type:String,
        required:true
    },
    avatar:{
        public_id:{
            type:String,
            required:false
        },
        url:{
            type:String,
            required:false
        }
    }
})
userSchema.pre("save",async function (){
try {
    const hash_password =  await bcrypt.hash(this.password,10)
this.password = hash_password
    
} catch (error) {
    console.log(error);
    
    
}
    
})
userSchema.methods.comparePassword = async function (password) {
    try {
      const validPassword = await bcrypt.compare(password, this.password);
      return validPassword; // Return true if passwords match, false otherwise
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return false;
    }
  };
userSchema.methods.generateToken = async function(){
try {
    return jwt.sign({
        userId:this._id.toString(),
        username:this.username,
        email:this.email,
        phone:this.phone
    },
    process.env.JWT_SECRET_KEY,
    {expiresIn:"30d"}
)
    
} catch (error) {
    console.log(error);
    
}
}

const User = mongoose.model("User",userSchema)
module.exports = User