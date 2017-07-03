const {ObjectID} = require('mongodb')
const jwt = require('jsonwebtoken')

const {Todo} = require('./../../models/todo')
const {User} = require('./../../models/user')

const userOneId = new ObjectID()
const userTwoId = new ObjectID()

const users = [{
    _id: userOneId,
    email: 'suyash@gm.com',
    password: 'userOnepass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({
            _id: userOneId,
            access: 'auth'
        }, 'secret').toString()
    }]
}, {
    _id: userTwoId,
    email: 'su@gm.com',
    password: 'userTwopass'
}]

const todos = [{
    _id: new ObjectID(),
    text: "Test 1"
}, {
    _id: new ObjectID(),
    text: "Test 2",
    completed: true,
    completedAt: 123
}]

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done())
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save()
        var userTwo = new User(users[1]).save()
        
        return Promise.all([userOne, userTwo])
    }).then(() => done())
}


module.exports = {todos, populateTodos, users, populateUsers}