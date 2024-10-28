const {z} = require("zod")

const signupZodSchema = z.object({
    username:z
    .string({required_error:"Name is required"})
    .trim(),
    email:z
    .string({required_error:"email is required"})
    .email({required_error:"invalid email address"})
    .trim(),
    phone: z
    .string({ required_error: "Phone number is required" })
    .min(10, { message: "Phone number must contain at least 10 digits" })
    .max(20, { message: "Phone number must not exceed 20 digits" }),
    password:z
    .string({ required_error: "Password number is required" })
    .min(3, { message: "passord number must contain at least 3 digits" })
    .max(20, { message: "passowrd number must not exceed 20 digits" }),


    
})

module.exports = signupZodSchema