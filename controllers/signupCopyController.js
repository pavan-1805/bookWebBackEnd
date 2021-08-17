const express = require('express');
const router = express.Router()
const User = require('../models/signupModel')

router.post('/signup',(request,response) => {
    let signedUser = new User({
        firstName : request.body.firstName,
        lastName : request.body.lastName,
        email : request.body.email,
        password : request.body.password
    });
    signedUser.save()
    .then( data => {
        response.json(data)
    })
    .catch( error =>{
        response.json(error)
    })

})

module.exports = router;