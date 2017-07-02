const {mongoose} = require('./../server/db/mongoose')
const {ObjectID} = require('mongodb')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

//Todo.remove({}).then((result) => {
//    console.log(result)
//})

// Todo.findOneAndRemove
// Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '5958fe46c1f802ffed7592e4'}).then((todo) => {
    console.log(todo)
})


Todo.findByIdAndRemove('5958fe46c1f802ffed7592e4').then((todo) => {
    console.log(todo)
})