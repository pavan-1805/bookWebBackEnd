const express = require('express');
const app = express();
const mongoose = require('mongoose')
const UserRoutes = require('./controllers/UserController')
const BookRoutes = require('./controllers/BookController')
const cors = require('cors')

app.use(cors())

mongoose.connect('mongodb://localhost/BookDatabase',{useNewUrlParser: true})
const conn = mongoose.connection
conn.on('open',()=>{
    console.log("Connected");    
})



app.use(express.json()) // 1. BodyParser

app.use('/users',UserRoutes) // 2. middleware

app.use('/books',BookRoutes)




const PORT = 3000;

app.listen( PORT , () =>{
    console.log(`port: ${PORT} is now enable to listen requests `);
})