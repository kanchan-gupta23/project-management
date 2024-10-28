const jwt = require('jsonwebtoken');
const User = require("../db/userSchema")

const authmiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    console.error("Token is not available");
    return res.status(401).json({ error: "Access denied, token not provided" });
  }

  // Remove "Bearer " from the token if present
  const jwtToken = token.replace("Bearer ", "").trim();

  try {
    // Verify the token
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    
    const userdata = await User.findOne({email:isVerified.email}).select({password:0})
    if (!userdata) {
      return res.status(404).json({ msg: 'User not found' });
  }

    console.log(isVerified);
    req.user= userdata
    req._id= userdata._id
    req.token = jwtToken

    
    // Optionally, attach user info to request object
 // Assuming the payload contains user info
    next();
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports =  authmiddleware ;
