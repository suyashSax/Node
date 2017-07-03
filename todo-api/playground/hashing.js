const {SHA256} = require('crypto-js')

var message = 'I am user no 3'
var hash = SHA256(message).toString()

console.log('Message: ', message)
console.log('Hash: ', hash)

var data = {
    id: 4
}

// salt: 'some secret' -> private -> intruder cannot simply hash

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'some secret').toString()
}

// validate that token was not manipulated:

// sample intrusion, cannot know salt
//token.data.id = 5 
//token.hash = SHA256(JSON.stringify(token.data))
                    

var resultHash = SHA256(JSON.stringify(token.data) + 'some secret').toString()

if (resultHash === token.hash){
    console.log('Data was not changed')
}
else{
    console.log('Data was changed... Do not trust!')
}