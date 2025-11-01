let auth_router = require("express").Router()
let userAuth = require("../model/authModel")
let jwt = require("jsonwebtoken")
let bcrypt = require("bcryptjs")

auth_router.post("/register", async (req,res)=>{
    console.log(req.body)
  
try {
    let {name,email,password,role} = req.body
    const hashedPassword = await bcrypt.hash(password,10)
    const newUser = new userAuth({name,email,password:hashedPassword,role})
    await newUser.save();
    res.status(200).json({message:"User rigister successfully"})

} catch (error) {
    res.status(500).json({message:"Somthing went wrong"})
}
})


auth_router.post("/login",async (req,res)=>{
    try {
        const {email,password}=req.body
        const user = await userAuth.findOne({email});
        if(!user){
           return res.status(404).json({message:"User not found"})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Invalid password"})
        }

        const token = jwt.sign({id:user._id,role:user.role},process.env.SECRET,{expiresIn:"1h"})
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({message:"Somthing went wrong"})
    }
})



module.exports = auth_router