const mongoose=require("mongoose")
const { type } = require("os")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter your name"]
    },
    email:{
        type:String,
        required:[true,"please enter email"]
    },
    password:{
        type:String,
        required:[true,"please enter password"]
    },
    role:{
        type:String,
        enum:["admin","member"],
        default:"member"
    },

})

userSchema.methods.getJwt=async function(){
    try{
 const user=this
    const token=await jwt.sign({_id:user._id},process.env.JWT_SECRET)
    return token
    
    }catch(err){
        console.log(err)
    }
   
}
userSchema.methods.validatePassword=async function(password){
    try{
    const user=this
    const matched=await bcrypt.compare(password,user.password)
    return matched
    }catch(err){
   console.log(err)
    }
  
}

const User=mongoose.model("User",userSchema)
module.exports=User