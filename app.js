require('dotenv').config();  
const express = require("express");
const app = express();
const connectDB = require("./db/db");
const cors = require("cors");
const authRouter = require("./router/auth-router"); 
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;  // Added `.v2` here
const taskRouter = require("./router/task-router");

const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "DELETE", "PATCH", "HEAD"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));  
app.options("*", cors(corsOptions));


// File upload middleware
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/"
}));
app.use(express.json()); 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
    api_key: process.env.CLOUDINARY_CLIENT_API,
    api_secret: process.env.CLOUDINARY_CLIENT_SECRET
});
app.use("/auth", authRouter);
app.use("/task", taskRouter);
app.use((req, res, next) => {
    console.log("Request Body:", req.body); // This should log the request body
    console.log("Files:", req.files); /// Log files to see if they're received
    next(); // Pass control to the next middleware
});

// Cloudinary configuration


const PORT = 3000;

// Start the server after connecting to the database
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is working on port ${PORT}`);
    });
});
