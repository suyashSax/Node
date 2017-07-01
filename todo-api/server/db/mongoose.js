const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp'); // mongoose takes care of async

module.exports = {mongoose}