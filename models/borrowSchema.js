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
    bookReturned:{
        type:Boolean,
        default:false,
    }
})
const Borrow=mongoose.model("Borrow",borrowSchema)
module.exports=Borrow