const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
const jwt=require("jsonwebtoken");
const { json } = require("express");
const cookie=require("cookie-parser")

const register = async (req, res) => {
  try {
    const { email, name, password, role } = req.body;
    const bcryptPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: bcryptPassword,
      role,
    });
    const savedUser = await user.save();
    const token=await savedUser.getJwt()
    res.cookie("token",token)
    res.status(201).json({message:"registered successfully",token})
  } catch (err) {
    res.status(400).json({error:err.message})
  }
};


const login=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email:email})
        if(!user){
            res.status(401).json({message:"user not found please register!!!"})
        }
        const isMatch=await user.validatePassword(password)
        if(isMatch){
        const token=await user.getJwt()
        res.cookie('token',token)
        res.status(200).json({message:"login successfully",user})
        }else{
            throw new Error("password wrong please re enter")
        }

    }catch(err){
    res.status(404).json({error:err.message})
    }
}

const logout=(req,res)=>{
res.cookie("token",null)
res.status(200).json({message:"logout successfully"})
}

module.exports ={register,login,logout}