const Comment = require('../models/comment')

class Controller {

    static async createComment(req,res,next){
        try {
            let comment = await Comment.create({
                description: req.body.description,
                user: req.decoded.id,
                post: req.params.postId
            })
            res.status(201).json(comment)
        } catch (error) {
            next(error)
        }
    }

    static async getAllComment(req,res,next){
        try {
            let comments = await Comment.find()
            res.status(200).json(comments)
        } catch (error) {
            next(error)
        }
    }

    static async getPostComment(req,res,next){
        try {
            let comments = await Comment.find({post: req.params.postId})
            res.status(200).json(comments)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = Controller