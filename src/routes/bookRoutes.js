const express = require('express');
const router = express.Router();
const BookCtrl = require('../controllers/bookControllers');
const { authenticateUser, checkIfAdmin } = require('../middlewares/authentication');


//POST request to /books to create a new book
router.post('/books', authenticateUser, checkIfAdmin, BookCtrl.createNewBook)

//GET request to /books to fetch all books
router.get('/books', authenticateUser, BookCtrl.fetchBook)

//GET request to /books/id to fetch single book
router.get('/books/:id', authenticateUser, BookCtrl.fetchSinglewBook)

//PUT request to /books/id to update a single book
router.put('/books/:id', authenticateUser, checkIfAdmin, BookCtrl.updateSingleBook)

//DELET request to /books/id to create a new book
router.delete('/books/:id', authenticateUser, checkIfAdmin, BookCtrl.deleteSingleBook)



module.exports = router