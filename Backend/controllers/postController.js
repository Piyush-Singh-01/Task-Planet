const Post = require("../models/postModel.js");

const createPost = async(req, res)=>{
    try {
        const {text, image} = req.body;
        const post = await Post.create({
            user: req.userId,
            text,
            image
        });
        return res.status(200).json(post);
    } catch (error) {
        res.status(500).json("Error in createpost",error);
    }
};

const getPosts = async(req, res)=>{
     try {
         const posts = await Post.find().populate("user", "username").populate("comments.user", "username").populate("likes", "username").sort({createdAt: -1});
         return res.status(200).json(posts);
     } catch (error) {
        console.log("Error in getPost",error);
        return res.status(500).json(error);
     }
}

const likePost = async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({msg: "Post not found"});
        }
        const userId = req.userId;

        const alreadyLiked = post.likes.includes(userId);
        if(alreadyLiked){
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        }else{
            post.likes.push(userId);
        }
        await post.save();
        res.status(200).json(post);
        
    } catch (error) {
        console.log("Error in likePost", error);
        res.status(500).json({msg: "Server error"});
    }
};

const commentPost = async(req, res)=>{
    try {
        const postId = req.params.id;
        const userId = req.userId;
        const {text} = req.body;

        const post = await Post.findById(postId);
        if(!post){
            return res.status(404).json({msg: "Post not found"});
        }
        post.comments.push({
            user: userId,
            text: text
        });
        await post.save();
        return res.status(200).json(post);
    } catch (error) {
        console.log("Error in commentPost", error);
        return res.status(500).json({msg: "Server error in comment"})
    }
}

module.exports = {createPost, getPosts, likePost, commentPost};
