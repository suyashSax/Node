const {MongoClient, ObjectID} = require('mongodb')

var obj = new ObjectID

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to mongodb server')
    }
    console.log('Connected to mongodb server')
    
//    db.collection('Todos').insertOne({
//        text: "Eat Food",
//        completed: false
//    }, (err, result) => {
//        if (err){
//            return console.log('Unable to insert todo', err)
//        }
//        console.log(JSON.stringify(result.ops, undefined, 2))
//    })
    
    db.collection('Users').insertOne({
        name: "Suyash",
        age: 18,
        location: "DXB"
    }, (err, result) => {
        if (err){
            return console.log('Unable to insert todo', err)
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
    })
    
    db.close();
})