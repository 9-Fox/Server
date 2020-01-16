const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')
const Post = require('../models/post')
const Comment = require('../models/comment')

function authentication(req, res, next) {
    try {
        if (!req.headers.token) throw ({ statusCode: 403, message: 'Access denied, token required' })
        req.decoded = verifyToken(req.headers.token)

        User.findById(req.decoded.id)
            .then((user) => {
                if (!user) throw ({ statusCode: 403, msg: "Token Rejected" })
                next()
            })

    } catch (error) {
        next({ statusCode: 403, message: 'Access denied, invalid token' })
    }
}

function authorization(req, res, next) {
    Post.findById(req.params.id)
    .then((post) => {
        if(!post) throw ({statusCode: 404, message: 'Article not found'})
        else if(post.owner != req.decoded.id) throw({statusCode: 403, message: 'Unauthorized'})
        else next()
    })
    .catch(next);
}

module.exports = {
    authentication,
    authorization
}