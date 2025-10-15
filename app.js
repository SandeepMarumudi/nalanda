const connectDB = require("./dataBase/dataBAse");
const express=require("express")



const app=express()
app.use(express.json())



























connectDB()
.then(()=>{
    console.log("database successfully connected")
    app.listen("8000",()=>{
        console.log("server started on 8000")
    }) 
})
.catch((err)=>{
    console.log(err)
})