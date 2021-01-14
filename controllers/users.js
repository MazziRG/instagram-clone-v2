const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

let activePosts = false

const Post= require('../models/posts.js')
const User= require('../models/users.js')

const isAuthenticated = (req,res, next)=>{


    if(req.session.currentUser){
        return next()
    }else{
        res.redirect("/login")
    }
}


router.get('/login',(req,res)=>{

    res.render('users/login.ejs',{
      currentUser: req.session.currentUser,
    })

})



/////index
router.get('/',isAuthenticated,(req,res)=>{
    // console.log("home",req.session.currentUser._id)

            res.render('users/home.ejs',
            {
                activePosts: activePosts,
                currentUser: req.session.currentUser,
            })

} )


//////////////////////
//// post
router.get('/new',(req,res)=>{
    res.render('users/signup.ejs',
    {
        currentUser: req.session.currentUser
    })
})



/// post ---create
router.post('/',(req,res)=>{

        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        console.log(req.body)
        User.create(req.body,
        (err,newUser)=>{
        console.log(newUser)
        res.redirect('/')
    })

} )
////////////////////////




//// show
router.get('/:user',isAuthenticated,(req,res)=>{
    User.findOne({username:req.session.currentUser.username},(error, foundUser)=>{
        // console.log("show Route",foundUser.posts)
        Post.find({_id:{$in:foundUser.posts}},(err, foundPost)=>{
            // console.log(foundPost)
            res.render('users/show.ejs',{
                
                currentUser: req.session.currentUser,
                Posts: foundPost,
            })

        })
    })
})


//---------------------------

/////////////////////////////
//// edit 
router.get('/:id/edit',isAuthenticated,(req,res)=>{
        res.render('users/edit.ejs',{
            currentUser: req.session.currentUser,
            userId: req.params.id,
        })
} )

///// edit ---put
router.put('/user/:id',isAuthenticated,(req,res)=>{
    user = req.session.currentUser

    for (const [key, value] of Object.entries(req.body)) {
        if(value== ""){
            req.body[key] = user[key]
            
        }

        console.log(key, value)
    }
    if(user.username == "user.display"){
        req.body= user
    }
    User.findByIdAndUpdate(req.params.id, 
        req.body,{new:true},
        (error, updatedUser )=>{
            req.session.currentUser = updatedUser
            console.log("Updated User",updatedUser )
            res.redirect(`/${req.session.username}`)
    })
} )

router.put('/pass/:id',isAuthenticated,(req,res)=>{
    user = req.session.currentUser

    if(bcrypt.compareSync(req.body.password, user.password)){

        let newPassword = {password:req.body.newPassword}
        newPassword.password = bcrypt.hashSync(newPassword.password, bcrypt.genSaltSync(10))
        User.findByIdAndUpdate(req.params.id, 
            newPassword,{new:true},
            (error, updatedUser )=>{
                req.session.currentUser = updatedUser
                console.log("Updated Password",updatedUser )
                res.redirect(`/${req.session.username}`)
        })

    }else{
        
        res.redirect(`/${req.params.id}`)
    }



} )

/////////////////////////////


router.delete('/:id',isAuthenticated,(req,res)=>{
    User.findByIdAndRemove(req.params.id
        ,(error, deletedPost )=>{
        console.log("deleted Post:",deletedPost)
        req.session.destroy(()=>{
            res.redirect('/')
        })
    })
} )
//-----------------------------






module.exports = router;
