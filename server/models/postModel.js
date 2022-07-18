import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    authorName: {
        type: String,
        required: true, 
        min: 1
    },
    approve: {
        type: Boolean,
        default: false,
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    images: [{
        type: String,
        min: 1,
        required: true,
    }],
    content: {
        type: String,
        required: true,
        min: 10
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: [String],
        default: [],
    },
    tags: [{type: String, min: 2, required: true}],
}, {
    timestamps: true,
})

const Post = mongoose.model('Post', postSchema);

export default Post;