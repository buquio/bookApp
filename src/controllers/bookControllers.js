const book = require('../models/book')



//create new book  and save to db
exports.createNewBook = function (req, res)  {
Book.create(
    {
    title: req.body.title,
    author: req.body.author,
    category: req.body.category,
    purchaseCount: req.body.purchaseCount,
    imageUrl: req.body.imageUrl,
    tags: req.body.tags,
    color: req.body.color
},
 function(err, newBook){
    // send reponse to client/user   
    if(err) {
        return res.status(500).json({ message: err })    
    }else {
       return res.status(200).json({ message: "new book created", newBook})
    }
}
)
}


/////////fetch all books
exports.fetchBooks = (req, res) => {
    Book.find([], (err, books) => {
        if(err) {
            return res.status(500).json({ message: err })    
                }else {
                // send reponse to client/user   
            return res.status(200).json({ books})
                }
            })
            
        }



///////////FIND BOOK BY QUERY/CONDITIONS
//fetch all books using GET on /books route
exports.fetchBooks = (req, res) => {
// console.log({ user: req.user})
//check req query for filters
//if there are filters, use tHem in model.find.query
// then fetch all  books
let conditions = [];
if (req.query.category){
    conditions.category = req.query.category
}
if (req.query.author){
    conditions.category = req.query.author
}

    Book.find(conditions, (err, books) => { //not just find all but with certain querys/conditions
            if(err) {
        return res.status(500).json({ message: err })    
            }else {
            // send reponse to client/user   
        return res.status(200).json({ books})
            }
        })
        
    }
////////////////////////

//fetch single book using GET on /books/id route
exports.fetchSingleBook = (req, res) =>{
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
    
}



// to update a document using PUT on /books/id
exports.updateSingleBook = (req, res) =>{
    Books.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        category: req.body.category
    }, function(err, book){
        if (err) {
            return res.status(500).json({message: err })
        }else if(!book) {
            return res.status(404).json({message: "book not found"})
        }else{ //if book
            book.save((err, saveBook) => {
                if(err) {
                    return res.status(400).json({message: err })
                } else {
            return res.status(200).json({message: "book updated sucessfully"})
                }
            })
        }
    })

}


//to delete a document
exports.deleteSingleBook = (req, res) =>{
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
    
}




