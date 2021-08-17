const express = require('express');
const router = express.Router()
const User = require('../models/signupModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


router.post('/signup',(request,response) => {

    User.findOne({email : request.body.email})
    .then( signedUser => {
        if(signedUser) {

            return response.status(409).json({
                message : `${signedUser.email} is already exists`
            })
        }
        
        bcrypt.hash(request.body.password,10,(error, encryptedPassword)=>{

            if(error){
                return response.json({
                    Error : error
                })
            }

            let signedUser = new User({
                firstName : request.body.firstName,
                lastName : request.body.lastName,
                email : request.body.email,
                password : encryptedPassword
            });

            signedUser.save()
            .then( (data) => {
                response.json({
                    message : `user ${data.email} is added successfully`
                })
                
            })
            .catch( error =>{
                response.json(error)
            })



        })

    })

})

router.post('/login',(request,response)=>{

    const email = request.body.email
    const password = request.body.password
    console.log(email,password);
    const user = {email : email,password : password}
    const token = jwt.sign(user,'pavan',{expiresIn : "60s"})

    User.findOne({ email: request.body.email})
    .then( result => {
        if(result.length < 1){
            return response.status(401).json({
                message : "mail not found"
            })
        }
        bcrypt.compare(request.body.password, result.password, (err,res) =>{
            if(err){
                return respone.status(401).json({
                    message : "Authentication Failed"

                })
            }
            if(res){
                return response.status(200).json({
                    
                    token

                });
            }
            response.status(401).json({
                message : "Authentication Failed"

            })                  
            
        })
    })
})

exports.authenticate=(request,response,next)=> {

    const header = request.header("Autherization")
    const token = header && header.split(' ')[1];

    if(token == null){
        return response.sendStatus(401)
    }
    jwt.verify(token,"pavan",(error,user)=>{
        console.log("papa");
        if(error){
            if(error.name === "TokenExpriredError"){
                console.log("exp");
                return response.status(401).json("Session Exprired...Please Login Again")
            }
            return response.status(403).json("some thing went wrong")
        }
        request.user = user;
        next()

    })

}



module.exports = router;
