const mongoose = require('mongoose');
const { Schema } = mongoose;

 
 //schema
 const bookSchema = new Schema({
    title: {
        type: String,
        required: true
     },
    author: String,
    description: String,
    category: {
        type: String,
        enum: ["friction", "non-friction", "comics", "others"],
        default: "friction"
     },
    purchaseCount: Number,
    imageUrl: String,
    tags: Array,
    color: String
});


model.exports = mongoose.model('Book', bookSchema);
