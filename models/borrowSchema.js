const mongoose=require("mongoose")
const { ref } = require("process")
const User = require("./userSchema")
const Book = require("./bookSchema")


const borrowSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    book:{
        type:mongoose.Schema.ObjectId,
        ref:"Book",
        required:true
    },
    borrowedAt:{
        type:Date,
        default:Date.now()
    },
    returnedAt:{
        type:Date,
        
    }
})
const Borrow=mongoose.model("Borrow",borrowSchema)
module.exports=Borrow