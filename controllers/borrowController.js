const Book = require("../models/bookSchema")
const Borrow = require("../models/borrowSchema")
const { findById } = require("../models/userSchema")

const borrowBook=async(req,res)=>{
try{
    if(req.user.role!=="member"){
   return res.status(403).json({message:"Access denied"})
    }
    const book=await Book.findById(req.params.id)
    if(!book){
        return res.status(404).json({message:"Book not found"})
    }
    if(book.availableCopies<=0){
        return res.status(400).json({message:"Copies not available"})
    }
    const borrow=await new Borrow({
        user:req.user._id,
        book:book._id

    })
    await borrow.save()

    book.availableCopies-=1
    await book.save()
    res.status(201).json({message:"Book borrowed successfully",book})

}catch(err){
res.status(400).json({error:err.message})
}
}

const returnBook=async(req,res)=>{
    try{
        if(req.user.role!=="member"){
            return res.status(403).json({message:"Access denied"})
        }
        const borrow=await Borrow.findOne({
            user:req.user._id,
            book:req.params.id,
            returnedAt:{$exists:false}
        })
        if(!borrow) return res.status(404).json({message:" not borrowed books found"})
            borrow.returnedAt=new Date()
        await borrow.save()

        const book=await Book.findById(req.params.id)
        book.availableCopies+=1
        await book.save()
        res.status(200).json({message:`${book.title} book returned successfully`})

    }catch(err){
        res.status(400).json({error:err.message})
    }
}

const borrowHistory=async(req,res)=>{
    try{
        if(req.user.role!=="member") return res.status(403).json({message:"Acesse denied"})
        const history=await Borrow.find({user:req.user._id})
        .populate("book","title author")
        .sort({borrowedAt:-1})

        res.status(200).json({total:history.length,history})

    }catch(err){
        res.status(400).json({error:err.message})
    }
}

module.exports={borrowBook,returnBook,borrowHistory}