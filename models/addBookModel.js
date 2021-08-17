const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addBookSchema = new Schema({
    BookCover : {
        type : String,
        required : true

    },
    BookId: {
        type : String,
        required : true

    },
    BookTitle : {
        type : String,
        required : true

    },
    BookAuthor : {
        type : String,
        required : true

    },
    BookPrice : {
        type : String,
        required : true

    },
    BookRating : {
        type : Number,
        required : true
    },
    date : {
        type : Date,
        default : Date.now
    }

});

const Book = new mongoose.model('BooksData',addBookSchema);

module.exports = Book