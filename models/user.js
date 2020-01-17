const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Bcrypt = require('../helpers/bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email tidak valid'],
        validate: {
            validator: function (v) {
                User.findOne({ email: v })
                    .then((user) => {
                        return user ? false : true
                    })
                    .catch(err => console.log(err))
            }
        },
        unique: true,
        required: true
    },
    name: {
        type: String,
        validate: {
            validator: function (v) {
                User.findOne({ name: v })
                    .then((user) => {
                        return user ? false : true
                    })
                    .catch(err => console.log(err))
            }
        },
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: String
    }
})

UserSchema.pre('save', function (next) {
    this.password = Bcrypt.hash(this.password)
    if(!this.profile) this.profile = `https://api.adorable.io/avatars/285/${this.email}.png`
    next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User