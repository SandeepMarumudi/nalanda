const express=require("express")
const { borrowBook, returnBook, borrowHistory, mostBorrowedBook, mostActiveMember, summaryReport } = require("../controllers/borrowController")
const authMiddleware = require("../middlewares/authMiddleware")
const bookRouter = require("./book")
const borrowRouter=express.Router()

borrowRouter.post("/borrowBook/:id",authMiddleware,borrowBook)//only member
borrowRouter.post("/returnBook/:id",authMiddleware,returnBook)// only member
borrowRouter.get("/borrowHistory",authMiddleware,borrowHistory)// only member

borrowRouter.get("/mostBorrowedBook",authMiddleware,mostBorrowedBook) //only admin
borrowRouter.get("/mostActiveMember",authMiddleware,mostActiveMember) // only admin
borrowRouter.get("/summaryReport",authMiddleware,summaryReport)// only admin


module.exports=borrowRouter