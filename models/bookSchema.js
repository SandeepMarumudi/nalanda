const mongoose=require("mongoose")
const { type } = require("os")
const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"please enter title"],
        unique:true
    },
    author:{
        type:String,
        required:[true,"please enter author name"]
    },
    ISBN:{
        type:String,
        required:[true,"please enter ISBN"],
        unique:true
    },
    genre:{
        type:String,
        required:[true,"please enter genre"]
    },
    publicationDate:{
        type:Date,
        required:[true,"please enter publication date"]
    },
    copies:{
        type:Number,
        required:[true,"please enter no of copies"]
    },
    availableCopies:{
        type:Number,
        default:1
    }

})

const Book=mongoose.model("Book",bookSchema)
module.exports=Book