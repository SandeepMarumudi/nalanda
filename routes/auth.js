const express=require("express")
const {register,login, logout} = require("../controllers/authControllers")
const authMiddleware = require("../middlewares/authMiddleware")
const authRouter=express.Router()



authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.post("/logout",logout)

authRouter.get("/getProfile",authMiddleware,(req,res)=>{
    res.status(200).json({
        message:"fetched successfully",
        user:req.user
    })
})

module.exports=authRouter