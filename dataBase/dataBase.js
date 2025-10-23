const { default: mongoose } = require("mongoose")
require("dotenv").config()

const connectDB=async()=>{
    try{
       await mongoose.connect(process.env.MONGO_URL)
    }catch(err){
     throw new Error(err.message)
    } 
}

module.exports=connectDB