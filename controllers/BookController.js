const express = require('express');
const router = express.Router()
const Book = require('../models/addBookModel')
const authenticate = require('./UserController')


router.post('',authenticate,(request,response) => {


    Book.findOne({BookTitle : request.body.BookTitle})
    .then( AddingBook => {
        if(AddingBook) {

            return response.status(409).json({
                message : `${AddingBook.BookTitle} already exists`
            })
        }
        else{
        const AddingBook = new Book({
                BookCover : request.body.BookCover,
                BookId : request.body.BookId,
                BookTitle : request.body.BookTitle,
                BookAuthor : request.body.BookAuthor,
                BookPrice : request.body.BookPrice,
                BookRating : request.body.BookRating,
                
            });

            AddingBook.save()
            .then( () => {
                response.json({
                        message : "Book Added"
                    })    
                                
            })
            .catch( error =>{
                response.json({
                    error : error
                })
            })
        }   

    })

})

router.get('',(request,response)=>{
    Book.find()
        .then(result=>{
            if(result){
                let book=[];
                result.forEach(element => {
                    book.push({
                        BookCover : element.BookCover,
                        BookId : element.BookId,
                        BookTitle : element.BookTitle,
                        BookAuthor : element.BookAuthor,
                        BookRating : element.BookRating,
                        BookPrice : element.BookPrice

                    });
                    
                });
               return response.status(200).json({
                   book
               })
                
            }       
        })
        .catch(error=>{
            response.status(500).json({
                Error : error
            })
        })
        
})


router.get('/by/:id',(request,response)=>{
    Book.findOne({bookId:request.params.id})
    
        .then(result => {
            response.json({
                BooksData : result,
                message : "searched book"

            })

        })  
        .catch(error=>{
            response.status(500).json({
                Error : error
            })
        }) 
})


router.get('/by/:author',(request,response)=>{

    
    Book.findOne({bookAuthor:request.params.author})
        .then(result => {
            response.json({
                BooksData : result
            })

        })  
        .catch(error=>{
            response.status(500).json({
                Error : error
            })
        }) 
})


router.delete("/:id",(request,response)=>{
    console.log("target",request.params.id);
    Book.deleteOne({BookId : request.params.id})
    .then(result =>{
        
        response.status(202).json({
            
            message : "Book Deleted Successfully"
            
        })
        console.log("pavan");
        
    })
    .catch(err=>{
        response.status(204).json({
            Error : err
        })
    })
})


module.exports = router;