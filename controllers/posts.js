const express = require('express')
const router = express.Router()

const Post= require('../models/posts.js')
const User = require('../models/users.js')

const isAuthenticated = (req,res, next)=>{
    if(req.session.currentUser){
        return next()
    }else{
        res.redirect("/")
    }
}


//////////////////////
//// post
router.get('/new',isAuthenticated, (req,res)=>{
    res.render('posts/new.ejs',
    {
        currentUser: req.session.currentUser,
    })
})

/// post ---create
router.post('/', isAuthenticated,(req,res)=>{


    Post.create(req.body,(err,newPost)=>{

        User.findByIdAndUpdate(req.session.currentUser._id,{$push:{posts:newPost}}, (err,foundUser)=>{
            // console.log("New Posts", foundUser.posts)
            // console.log(newPost)
            res.redirect(`/${req.session.username}`)

        })
    })
})


////////////////////////



//// show 
router.get('/:id',isAuthenticated,(req,res)=>{
    Post.findById(req.params.id,(error, foundPost)=>{
        
        res.render('posts/show.ejs',{
            currentUser: req.session.currentUser,
            post: foundPost,
        })
    })
} )


//---------------------------

/////////////////////////////
//// edit 
router.get('/:id/edit',isAuthenticated,(req,res)=>{
    Post.findById(req.params.id,(error, foundPost )=>{
        res.render('posts/edit.ejs',{
            currentUser: req.session.currentUser,
            post:foundPost,
        })
    })
} )
///// edit ---put
router.put('/:id',isAuthenticated,(req,res)=>{
    Post.findByIdAndUpdate(req.params.id, 
        req.body,{new:true},

        (error, updatedPost )=>{
            console.log("Updated Post",updatedPost)
            res.redirect(`/post/${req.params.id}`)

    })

} )
/////////////////////////////


router.delete('/:id',isAuthenticated,(req,res)=>{

    User.findByIdAndUpdate(req.session.currentUser._id,{$pull:{posts: req.params.id}},(err, foundRef)=>{
        console.log(foundRef)
        Post.findByIdAndRemove(req.params.id
            ,(error, deletedPost )=>{
                console.log("deleted Post:",deletedPost)
                res.redirect(`/${req.session.username}`)

        })


    })
    
 



} )
//-----------------------------





module.exports = router;