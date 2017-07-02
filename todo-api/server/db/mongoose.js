const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI); // mongoose takes care of async

module.exports = {mongoose}