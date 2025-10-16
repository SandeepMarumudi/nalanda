const express=require('express')
const {addBook,updateBook, deleteBook, allBooks} = require('../controllers/bookController')
const authMiddleware = require('../middlewares/authMiddleware')
const bookRouter=express.Router()

bookRouter.post("/addBook",authMiddleware,addBook)
bookRouter.patch("/updateBook/:id",authMiddleware,updateBook)
bookRouter.delete("/deleteBook/:id",authMiddleware,deleteBook)
bookRouter.get("/allBooks",authMiddleware,allBooks)
module.exports=bookRouter