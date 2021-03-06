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
  console.log("REQ.BODY ", req.body);
  const user = await userModel.findOne({
    email: req.body.email,
  })
  // console.log(user)
  if (user) {
  if (bcrypt.compareSync(req.body.password, user.password)) {
      user.token = uid2(32);
      const userWithNewToken = await user.save();
      res.json({status: "OK", message: userWithNewToken});
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

/* POST savetowishlist page. */
router.post('/wishlist', async function(req, res, next) {
  let userToSave = ""
  console.log("REQ.BODY sur wishlist POST ",req.body)
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

/* DELETE delete from wishlist page. */
router.delete('/wishlist/:token/:title', async function(req, res, next) {
  console.log("%c route deletewishlist REQ.BODY", "color: teal", req.params)
  let wishlistToSave = "RAS"
  const user = await userModel.findOne({
    token: req.params.token
  })
  userToSave = user;
  if (user !== null) {
    user.wishlist = user.wishlist.filter(wish => wish.title !== req.params.title)
    wishlistToSave = await user.save();
    console.log(wishlistToSave)
  }
  
  res.json(wishlistToSave);
});

/* POST get user wishlist page. */
router.post('/getwishlist', async function(req, res, next) {
  let wishlist = [];
  // console.log("%c route getwishlist REQ.BODY", "color: teal", req.body)
  const user = await userModel.findOne({
    token: req.body.token
  })
  if (user !== null) {
    wishlist = user.wishlist;
    // console.log(wishlist)
  }
  res.json(wishlist);
});

/* GET LOGOUT page. */
router.post('/logout', async function(req, res, next) {
  let userDisconnected;
  console.log("REQ.BODY.TOKEN ", req.body.token);
  const user = await userModel.findOne({
    token: req.body.token
  })
  if (user !== null) {
    user.token = null;
    userDisconnected = await user.save();
  }
  // res.send(userDisconnected);
  res.json({status: "OK", message: userDisconnected});
});

module.exports = router;
