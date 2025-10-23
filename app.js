const connectDB = require("./dataBase/dataBase");
const express=require("express");
const authRouter = require("./routes/auth");
const cookieParser=require("cookie-parser");
const bookRouter = require("./routes/book");
const borrowRouter = require("./routes/borrow");



const app=express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/book",bookRouter)
app.use("/api",borrowRouter)


connectDB()
.then(()=>{
    console.log("database successfully connected")
    app.listen(process.env.PORT,()=>{
        console.log("server started on 8000")
    }) 
})
.catch((err)=>{
    console.log(err)
})