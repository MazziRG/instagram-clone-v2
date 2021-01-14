const mongoose = require('mongoose'); // require mongoose
const Schema = mongoose.Schema;



const postSchema = new Schema({ 
    img:{type:String, default: String  },
    caption:{type: String, default: String},
    // comments:{type: Array, default:[]},
    likes: {type: Number, default: 0},
    // user:{type: Schema.Types.ObjectId, ref: 'User' }
},{ timestamps: true })


const Post = mongoose.model('Post', postSchema);

module.exports = Post;