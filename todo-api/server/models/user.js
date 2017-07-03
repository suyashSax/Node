const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const bcrypt = require('bcryptjs')

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

// instance methods

UserSchema.methods.generateAuthToken = function(){
    var user = this
    var access = 'auth'
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString()
    
    console.log("Success ")

    // tokens is a normal array...
    user.tokens.push({access, token})
    return user.save().then(() => {
        return token
    })
}

UserSchema.methods.removeToken = function (token){
    var user = this
    return user.update({
        $pull: {
            tokens: {
//                token: token
                token
            }
        }
    })
} 

// model methods

UserSchema.statics.findByToken = function(token){
    var User = this
    var decoded
    
    try{
        decoded = jwt.verify(token, process.env.JWT_SECRET)
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

UserSchema.statics.findByCred = function(email, password){
    var User = this
    return User.findOne({email}).then((user) => {
        if (!user){
            return Promise.reject()
        }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user)
                }
                else{
                    reject()
                }
            }) 
        })
    })
}

// mongoose middleware to auth before saves

UserSchema.pre('save', function(next){
    var user = this
    
    // don't want to encrypt password twice :P
    
    if (user.isModified('password')){
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash
                next()
            })
        })
    }
    else{
        next()
    }
})

var User = mongoose.model('User', UserSchema)

module.exports = {User}



























