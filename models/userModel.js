let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
username: {type: String, required: [true, "Merci de saisir un 'username'"], minLength: [4, "Votre surnom doit contenir 4 caractères minimum"]},
email: {type: String, required: [true, "Merci de saisir un email"], unique: true},
password: {type: String, required: [true, "Merci de saisir un mot de passe"], minLength: [4, "le mot de passe doit contenir 4 caractères minimum"]},

})
let userModel = mongoose.model('users', userSchema);

module.exports = userModel;