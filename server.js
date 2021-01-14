require('dotenv').config()
const mongoose = require('mongoose');
const express = require('express')
const app = express()
const methodOverride = require('method-override');

// /sessions
const session = require('express-session')
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}))

///env variables
const port = process.env.PORT 
const mongodbURI = process.env.MONGODBURI


/// middelware
app.use(methodOverride('_method'));
app.use(express.json())
app.use(express.urlencoded({extends: true}))
app.use(express.static('public'))


//// mongoose
const db = mongoose.connection;
mongoose.connect(mongodbURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, () => {
    console.log('the connection with mongod is established');
  });

db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', mongodbURI));
db.on('disconnected', () => console.log('mongo disconnected'));

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController)
const usersController = require('./controllers/users.js');
app.use('', usersController)
const postsController = require('./controllers/posts.js');
app.use('/post', postsController)





/////



app.get('/home',(req,res)=>{
  res.render('users/home.ejs',
  {currentUser: req.session.currentUser,})
} )







app.listen(port, () => {
    console.log('listening on port:', port)
}) 
