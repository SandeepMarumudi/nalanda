const User = require("../models/userSchema")
const jwt=require("jsonwebtoken")

const authMiddleware=async(req,res,next)=>{
    try{
        const {token}=req.cookies
        if(!token){
            return res.status(401).json({message:"pleae login!!!"})
        }
        const decoded=await jwt.verify(token,process.env.JWT_SECRET)
        const {_id}=decoded
        const user=await User.findById({_id:_id})
        if(!user){
            return res.status(404).json({message:'please Register!!!'}) 
        }
        req.user=user
        next()

    }catch(err){
          return res.status(400).json({message:"invalid token"})
    }
}
module.exports=authMiddleware