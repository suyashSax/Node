const {mongoose} = require('./../server/db/mongoose')
const {ObjectID} = require('mongodb')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

var id = '5958ba58fda7de1edd4737a8'
var uid = '5957ee4f5ed33ac8f386703e'

if(!ObjectID.isValid(id)){
    console.log('Id not valid')
}

Todo.find({                             // returns array even if just one object (i.e. inconvenient [] for empty response)
    _id: id
}).then((todos) => {
    console.log('Todos: ', todos)
})

Todo.findOne({                          // returns object (i.e. convenient null for empty response)
    _id: id
}).then((todo) => {
    console.log('Todo: ', todo)
})

Todo.findById(id).then((todo) => {
    if (!todo){
        return console.log('ID not found...')
    }
    console.log('Todo by ID: ', todo)
}).catch((e) => console.log(e))

User.findById(uid).then((user) => {
    if (!user){
        return console.log('User not found...')
    }
    console.log('User by ID: ', user)
}).catch((e) => console.log(e))

