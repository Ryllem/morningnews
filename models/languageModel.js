let mongoose = require('mongoose')

let languageSchema = mongoose.Schema({
token: String,
language: String
})
let languageModel = mongoose.model('users', languageSchema);

module.exports = languageModel;