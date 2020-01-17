const Post = require('../models/post')

class Controller {

    static async getAllPost(req, res, next) {
        try {
            let posts = await Post.find().populate('user', '-password')
            res.status(200).json(posts)
        } catch (error) {
            next(error)
        }
    }

    static async getOnePost(req, res, next) {
        try {
            let post = await Post.findById(req.params.id).populate('user', '-password')
            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

    static async createPost(req, res, next) {
        try {
            let post = await Post.create({
                owner: req.decoded.id,
                image: req.body.file,
                title: req.body.title
            })
            res.status(201).json(post)
        } catch (error) {
            next(error)
        }
    }

    static async deletePost(req, res, next) {
        try {
            let post = await Post.findByIdAndDelete(req.params.id)
            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

    static async likePost(req, res, next) {
        try {
            let post = await Post.findByIdAndUpdate(req.params.id, {
                $addToSet: { likes: req.decoded.id },
                $pull: {dislikes: req.decoded.id}
            }, { new: true }).populate('user', '-password')

            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

    static async dislikePost(req, res, next) {
        try {
            let post = await Post.findByIdAndUpdate(req.params.id, {
                $addToSet: { dislikes: req.decoded.id },
                $pull: {likes: req.decoded.id}
            }, { new: true }).populate('user', '-password')

            res.status(200).json(post)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = Controller