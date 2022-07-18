import asyncHandler from 'express-async-handler';	
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

// @desc Fetch all posts
// @route GET /api/posts
// @access Public

const getAllPosts = asyncHandler(async (req, res) => {
    const allPosts = await Post.find({});
    res.json(allPosts);
});

const getPostApproved = asyncHandler(async (req, res) => {
    const allPosts = await Post.find({ approve: true });
    res.json(allPosts);
})

const getPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ msg: 'Post not found or not approved' });
    }

    let { views } = post;
    views++;
    await post.updateOne({ views });

    return res.status(200).json(post);
})

const getMyPost = asyncHandler(async (req, res) => {
    const post = await Post.find({ user: req.user.id });

    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }

    return res.status(200).json({success: true, post});
})

const createPost = asyncHandler(async (req, res) => {
    const { title, images, content, tags } = req.body;

    const duplicatedPost = await Post.findOne({ title });
    const author = await User.findOne({_id: req.user.id});

    if(duplicatedPost) {
        return res.status(400).json({ msg: 'Duplicate title' });
    }

    const { name } = author;
    const newPost = await Post.create({
        user: req.user.id,
        authorName: name,
        title,
        images: images || [],
        content,
        tags: tags || [],
        approve: false,
    });

    return res.status(201).json(newPost);
})

const updatePost = asyncHandler(async (req, res) => {
    const { title, images, content, tags } = req.body;

    const post = await Post.findOne({ _id: req.params.id});

    if(post.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
    }

    if(post){
        post.title = title || post.title;
        post.images = images || post.images;
        post.content = content || post.content;
        post.tags = tags || post.tags;

        const updatedPost = await post.save();

        res.json({
            _id: updatedPost._id,
            title: updatedPost.title,
            images: updatedPost.images,
            content: updatedPost.content,
            tags: updatedPost.tags,
        })
    }else{
        return res.status(404).json({ msg: 'Post not found' });
    }
    
})

const aprrovePost = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });

    if (!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }

    await post.updateOne({ approve: true });

    res.status(200).json(post);
})

const likePost = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });

    if(!req.user.id) {
        return res.status(401).json({ msg: 'You must login to like a post' });
    }

    if(!post) {
        return res.status(404).json({ msg: 'Post not found' });
    }

    const index = post.likes.findIndex((id) => id === String(req.user.id))

    if(index === -1){
        post.likes.push(req.user.id)
    }else{
        post.likes = post.likes.filter((id) => id !== String(req.user.id))
    }

    const like = await Post.findByIdAndUpdate(req.params.id, post, {new: true})
    res.json(like)
})

export const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findOne({ _id: req.params.id });
    const admin = await User.findOne({ isAdmin: true });

    if(!req.user.id) {
        return res.status(401).json({ msg: 'You must login to delete a post' });
    }

    if(!admin){
        return res.status(401).json({ msg: 'You must be an admin to delete a post' });
    }

    await post.remove();

    res.status(200).json({ msg: 'Post deleted' });
})

export { getAllPosts, getPost, getMyPost, aprrovePost, createPost, updatePost, getPostApproved, likePost };