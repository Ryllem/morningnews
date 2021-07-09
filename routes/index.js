var express = require('express');
var router = express.Router();
let bcrypt = require('bcrypt');
const uid2 = require('uid2');

const cost = 10;

const userModel = require('../models/userModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* POST Sign-in page. */
router.post('/signin', async function(req, res, next) {
  const user = await userModel.findOne({
    email: req.body.email,
  })
  console.log(user)
  
  if (user) {
  if (bcrypt.compareSync(req.body.password, user.password)) {
      res.json({status: "OK", message: user});
  } else {
     res.json({status: "KO", message: "Aucun utilisateur trouvé"})
  }
}

  
});

/* POST Sign-up page. */
router.post('/signup', async function(req, res, next) {
  const hash = bcrypt.hashSync(req.body.password, cost);
  console.log('password:', req.body.password)
  console.log('hash:', hash)
  let errorMessage = {};
  try {
    let userToSave = new userModel({
      username: req.body.username,
      email: req.body.email.toLowerCase(),
      password: hash,
      token: uid2(32),
      language: "fr"
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



/* POST setlanguage page. */
router.post('/setlanguage', async function(req, res, next) {
  console.log("req.body ", req.body)
  const user = await userModel.findOne({
    token: req.body.token,
  })
  console.log('user avant:', user)
  user.language = req.body.langue;
  const send = await user.save();
  res.json({status: "OK", message: send});
})

/* POST wishlist page. */
router.post('/wishlist', async function(req, res, next) {
  let userToSave = ""
  const user = await userModel.findOne({
    token: req.body.userToken
  })
  userToSave = user;
  if (user !== null) {
    user.wishlist.push(req.body);
    userToSave = await user.save();
    console.log(userToSave)
  }
  
  res.send(userToSave);
});



module.exports = router;
