const express=require("express")
const { borrowBook, returnBook, borrowHistory } = require("../controllers/borrowController")
const authMiddleware = require("../middlewares/authMiddleware")
const bookRouter = require("./book")
const borrowRouter=express.Router()

borrowRouter.post("/borrowBook/:id",authMiddleware,borrowBook)
borrowRouter.post("/returnBook/:id",authMiddleware,returnBook)
borrowRouter.get("/borrowHistory",authMiddleware,borrowHistory)
module.exports=borrowRouter