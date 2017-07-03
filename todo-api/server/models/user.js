const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

mongoose.Promise = global.Promise

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
            type: String,
            require: true,
            minLength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

// functions bind this, arrow funcs don't 

UserSchema.methods.toJSON = function(){
    var user = this
    var userObj = user.toObject()
    return _.pick(userObj, ['_id', 'email'])
}

// instance method

UserSchema.methods.generateAuthToken = function(){
    var user = this
    var access = 'auth'
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'secret').toString()
    
    // tokens is a normal array...
    user.tokens.push({access, token})
    return user.save().then(() => {
        return token
    })
}

// model method

UserSchema.statics.findByToken = function(token){
    var User = this
    var decoded
    
    try{
        decoded = jwt.verify(token, 'secret')
    }
    catch (e){
//        return new Promise((resolve, reject) => {
//            reject()
//        })
        return Promise.reject()
    }
    
    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    })
}

var User = mongoose.model('User', UserSchema)

module.exports = {User}



























