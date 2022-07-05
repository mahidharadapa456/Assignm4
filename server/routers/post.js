const express = require("express")
const router = express.Router();
const Post = require("../models/post")

router.post("/createPost", async(req, res) => {
    let post = new Post(req.body)
    try {
        post = await post.save()
        if(!post) return res.send({message: "Error while creating post"})
        res.send({message: "Success", post})
    } catch (e) {
        res.send({message: "Error", error: e})
    }
})

router.put("/editPost:id", async(req, res) => {
    let _id = req.params.id;
    try {
        const post = await Post.findOneAndUpdate(_id, req.body)
        if(!post) return res.send({ message: "Error"})
        res.send({message: "Success", post})
    } catch(e) {
        res.send(e)
    }
})

router.delete("/deletePost:id", async(req, res) => {
    const _id = req.params.id
    try {
        const post = await Post.deleteOne(_id)
        if(!post) return res.send({message: "Post not found"})
        res.send({message: "Deleted"})
    } catch(e) {
        res.send({ message: "Internal server error"})
    }
})

router.get("/allPosts", async(req, res) => {
    try {
        const post = await Post.find()
        if(!post) return res.send("Post not found")
        res.send({message: "Posts found", post})
    } catch (e) {
        res.send({message: "internal error", error: e})
    }
})

router.get("/userPosts/:userId", async (req, res) => {
    const userId = req.params.userId

    try{
        const userPost = await Post.find({postOwner: userId}).populate('postOwner')
        if(!(userPost.length > 0)) return res.status(404).send({message: "Any post not found"})

        res.json(userPost)
    } catch (e) {
        res.status(500).send({
            message: "Error occurred"
        })
    }
})

module.exports = router;