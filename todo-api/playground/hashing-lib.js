const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

var data = {
    id: 10
}

var token = jwt.sign(data, 'secret')
console.log('Token', token)

var decode = jwt.verify(token, 'secret')
console.log('Decoded:', decode)