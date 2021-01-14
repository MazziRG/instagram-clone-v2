const mongoose = require('mongoose'); // require mongoose
const Schema = mongoose.Schema;

const Post= require('../models/posts.js')



const profileImg =  "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"


const userSchema = new Schema({ 
    fullname:{type:String, required:true},
    email:{type:String, required:true},
    username:{ type:String,  require: true},
    password: { type: String, required: true},
    img:{type:String, default: profileImg },
    followers:{type:Number, default: 0},
    following:{type:Number, default: 0},
    description: {type: String, default: "" },
    posts:[{type:Schema.Types.ObjectId, ref:Post, default:[]}],
},{ minimize: false },
{timestamps:true}
)



const User = mongoose.model('User', userSchema);

module.exports = User;