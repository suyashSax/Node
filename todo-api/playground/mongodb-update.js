const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to mongodb server')
    }
    
    console.log('Connected to mongodb server')
    
//    db.collection('Todos').findOneAndUpdate({
//        _id: new ObjectID('5957a179e11355fb1c439568')
//    }, {
//        $set: {
//            completed: true
//        }
//    }, {
//        returnOriginal: false
//    }).then((res) => {
//        console.log(res)
//    })
    
    db.collection('Users').findOneAndUpdate({
        name: "Jaya"
    }, {
        $set: {
            name: "Mahak"
        },
        $inc:{
            age: 20
        }
    }, {
        returnOriginal: false
    }).then((res) => {
        console.log(res)
    })
     // db.close()
})