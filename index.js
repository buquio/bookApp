const express = require('express');
const app = ('express')();
const port = 4000;

//setup mongoose
const mongoose = require('mongoose');
const { modelName } = require('../TutoringApp/models/User');
const connectionString = "mongodb://localhost:27017/bookshore"
// const {Schema} = mongoose;

//create a function to connect to the database
mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, (err) => {
    if (err) {
        console.log({err})
    } else {
        console.log("Database connected!")
    }
})


 //schema
 const bookSchema = new mongoose Schema({
    title: String,
    author: String,
    category: String,
    purchaseCount: Number,
    imageUrl: String,
    tags: Array,
    color: String
});
const Book = mongoose.model('Book', bookSchema);


////create
////read
//find({}) -all
//find(query)
//find(id)
//find and update

//create new document in book collection:
app.post('/books', function(req, res){
    //retrieve new book detail from req.body
    const book = req.body.book;
//create a new book and save to db
Book.create({
    title: book.title,
    author: book.author,
    category: book.category,
    purchaseCount: book.purchaseCount,
    imageUrl: book.imageUrl,
    tags: book.tags,
    color: book.color
}, function(err, newBook){
    // send reponse to client/user   
    if(err) {
return res.status(500).json({ message: err })    
    }else {
return res.status(200).json({ message: "new book created", newBook})
    }
})

// model.find
// model.findOne
// model.findById

//fetch all books using GET on /books route
app.get('/books', function(req, res){
    //fetch all books
    Book.find([], function(err, books){
            // send reponse to client/user   
            if(err) {
        return res.status(500).json({ message: err })    
            }else {
        return res.status(200).json({ books})
            }
        })
        
    })
})


//fetch single book using GET on /books/id route
app.get('/books/:id', function(req, res){
    Book.findById({_id: req.params.id}, function(err, book){
        // send reponse to client/user   
        if(err) {
    return res.status(500).json({ message: err })    
        }else if(!book) {
        return res.status(404).json({ message: "book not found"})
            }else {
    return res.status(200).json({ book})
        }
    })
    
})

// to update a document using PUT on /books/id
app.put("/books/:id", function(req, res){
    Books.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        category: req.body.category
    }, function(err, book){
        if (err) {
            return res.status(500).json({message: err })
        }else if(!book) {
            return res.status(404).json({message: "book not found"})
        }else{ //if book
            book.save((err, saveBook){
                if(err) {
                    return res.status(400).json({message: err })
                } else {
            return res.status(200).json({message: "book updated sucessfully"})
                }
            })
        }
    })

})


//to delete a document
app.delete('/books/:id', function(req, res){
    Book.findByIdAndDelete({_id: req.params.id}, function(err, book){
        // send reponse to client/user   
        if(err) {
    return res.status(500).json({ message: err })    
        }else if(!book) {
        return res.status(404).json({ message: "book not found"})
            }else {
    return res.status(200).json({message:"book deleted sucessfully"})
        }
    })
    
})


app.listen(5000, () => console.log('app connected'))
