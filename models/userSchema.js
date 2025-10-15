const mongoose=require("mongoose")
const { type } = require("os")

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

const User=mongoose.model("User",userSchema)
module.exports=User