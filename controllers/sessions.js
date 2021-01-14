const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()

const User= require('../models/users.js')


sessions.get('/new', (req,res)=>{
    res.render('users/login.ejs',{
        currentUser: req.session.currentUser})

})


sessions.post('/', (req,res)=>{
    console.log("\n\n",req.body,"\n\n")

    User.findOne({username: req.body.username}, (err,foundUser)=>{
        // if error was found
        console.log("sessions",foundUser,"\n\n")
        if(err){
    
            console.log(err)
            res.send("oops the db had problems")
            
        }else if(!foundUser){ // if User was not found
            res.redirect('/login')
            
        }else{ // if User was found
    
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                req.session.currentUser = foundUser
                res.redirect('/')
    
            }else{
                res.redirect('/login')

            }
        }
    })
})


sessions.delete('/', (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
})


module.exports = sessions;
