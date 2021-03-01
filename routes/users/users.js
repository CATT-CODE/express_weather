var express = require('express');
var router = express.Router();

const {signup, login, homePage} = require("./controller/userController");
const { checkLoginInput } = require('./lib/checkLoginInput');

const {checkSignupDataType} = require("./lib/checkSignupDataType")

const {checkSignupInputIsEmpty} = require("./lib/checkSignupIsEmpty")


/* GET users listing. */
router.get('/signup', function(req, res, next) {
  if(req.session.user){
    res.redirect("/users/home")
  } else { 
    res.render("sign-up")
  }
});

router.get('/login', function(req, res, next) {
  res.render("log-in");
});

router.get('/home', function(req, res, next) {
  if(req.session.user) {
    res.render("home-page", {user: req.session.user.email});
  } else {
    res.render("access-error", {error: true});
  }
});

router.post("/home", homePage, function(req, res, next) {
  if(req.session.user) {
    res.render("home-page", {user: req.session.user.email});
  } else {
    res.render("access-error", {error: true});
  }
})

router.get('/logout', function(req, res) {
  req.session.destroy();
    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: null
    });
    return res.redirect("/users/login");
})

router.post("/signup", checkSignupInputIsEmpty, checkSignupDataType, signup);

router.post("/login", checkLoginInput, login);


module.exports = router;
