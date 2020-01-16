const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    title:{
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    dislikes: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema)

module.exports = Post