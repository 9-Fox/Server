'use strict';

const User = require('../models/user')

class Controller {
    static register(req, res, next) {
        const newUser = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password

        }
        User.create(newUser)
        .then(user => {
            res.status(201).json({
                Message: "New user has been created",
                data: user
            })
        })
        .catch(error => {
            next(error);
        })
    }
}

module.exports = Controller