const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err){
        return console.log('Unable to connect to mongodb server')
    }
    
    console.log('Connected to mongodb server')

    // delete many
//    db.collection('Todos').deleteMany({text: "Work out"}).then((res) => {
//        console.log(res)
//    })
    
    // delete one
    
//    db.collection('Todos').deleteOne({text: "Work out"}).then((res) => {
//        console.log(res) 
//    })
    
    // find one and delete it (w/ possibility of undo)
    
    db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
        console.log(res)
    })
    
    
    // db.close()
})