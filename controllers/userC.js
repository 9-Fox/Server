'use strict';

const User = require('../models/user');
const Bcrypt = require('../helpers/bcrypt');
const Jwt = require('../helpers/jwt')

class Controller {
    static register(req, res, next) {
        const newUser = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password

        }
        User.create(newUser)
            .then(user => {
                let data = {
                    email: user.email,
                    name: user.name
                }
                res.status(201).json({
                    Message: "New user has been created",
                    data
                })
            })
            .catch(error => {
                next(error);
            })
    }

    static login(req, res, next) {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) {
                    throw {
                        name: 'NotFound'
                    }
                } else {
                    const validationPassword = Bcrypt.dehash(req.body.password, user.password);
                    if (!validationPassword) {
                        throw {
                            name: "ValidationError"
                        }
                    } else {
                        const userToken = Jwt.genToken({ id: user._id });
                        // console.log(userToken);

                        res.status(200).json(userToken)
                    }
                }
            })
            .catch(error => {
                next(error);
            })
    }
}

module.exports = Controller