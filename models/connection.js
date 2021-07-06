var mongoose = require('mongoose');
var options = { 
connectTimeoutMS: 5000,
useUnifiedTopology: true,
useNewUrlParser: true,
}
mongoose.connect('mongodb+srv://willem:willem@cluster0.lgzth.mongodb.net/morningnews?retryWrites=true&w=majority', 
options,
function(err) {
console.log(err || 'MongoDb connecté')
})