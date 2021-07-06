var express = require('express');
const { setMaxListeners } = require('../models/userModel');
var router = express.Router();

const userModel = require('../models/userModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST Sign-in page. */
router.post('/signin', async function(req, res, next) {
  const user = await userModel.find({
    email: req.body.email,
    password: req.body.password
  })
  if (user.length === 0) res.json({status: "KO", message: "Aucun utilisateur trouvé"});
  if (user.length >= 1) res.json({status: "OK", message: user});
  
});

/* POST Sign-up page. */
router.post('/signup', async function(req, res, next) {
  let errorMessage = {};
  try {
    let userToSave = new userModel({
      username: req.body.username,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      });
      const userBdd = await userToSave.save();
      res.json({status: "OK", message: userBdd});
  } catch (error) {
    // console.log(error)
    if (error.code === 11000) {
      errorMessage = {email: `cette email '${error.keyValue.email}' est déjà utilisé`}
    } else {
      errorMessage = Object.fromEntries(
      Object.entries(error.errors)
      .map(([ key, val ]) => [ key, val.message ])
    );
    }
    res.json({status: "KO", message: errorMessage});
  }
});



module.exports = router;
