const {SHA256} = require('crypto-js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//var data = {
//    id: 10
//}
//
//var token = jwt.sign(data, 'secret')
//console.log('Token', token)
//
//var decode = jwt.verify(token, 'secret')
//console.log('Decoded:', decode)

var pwd = '123abc'

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(pwd, salt, (err, hash) => {
//        console.log(hash)
    })
})

var hashed = '$2a$10$s4qmFy.gflPrD.FaH6Iqau8IfOK95aRFBEJY3AfKeRfqXNX8b57mm'

bcrypt.compare(pwd, hashed, (err, res) => {
    console.log(res)
})