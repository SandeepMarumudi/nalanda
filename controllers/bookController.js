const Book = require("../models/bookSchema")

const addBook=async(req,res)=>{
    try{
        if(req.user.role!=="admin"){
            return res.status(401).json({message:"Acesses denied"})
        }
        const book= new Book(req.body)
        await book.save()
         res.status(201).json({message:"book added Successfully",book})

    }catch(err){
        res.status(400).json({error:err.message})
    }
}

const updateBook=async(req,res)=>{
    try{
        if(req.user.role!=="admin"){
            return res.status(403).json({message:"Access denied"})
        }
        const book=await Book.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({message:"successfully updated",book})

    }catch(err){
        res.status(400).json({error:err.message})
    }
}

const deleteBook=async(req,res)=>{
    try{
if(req.user.role!=="admin"){
        return res.status(403).json({message:"Access denied"})
    }
    const book=await Book.findByIdAndDelete(req.params.id)
    res.status(200).json({message:`${book.title} deleted succesfully`})
    }catch(err){
        res.status(400).json({error:err.message})
    }
    
}

const allBooks=async(req,res)=>{
    try{
        const books=await Book.find()
        res.status(200).json({total:books.length,Books:books})
    }catch(err){
        res.status(400).json({error:err.message})
    }
}
module.exports={addBook,updateBook,deleteBook,allBooks}