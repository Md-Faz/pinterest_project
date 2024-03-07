var express = require('express');
var router = express.Router();
const postModel = require("./post");
const userModel = require("./users");
const passport = require('passport');
const localStrategy = require('passport-local');
const upload = require('./multer');


passport.use(new localStrategy(userModel.authenticate()));

router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/register', function (req, res, next) {
  res.render('register');
});

router.get('/profile', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user })
    .populate("posts")
  //this pulls out the data of the specific user that is logged in, and populate will give out all the data of posts database 
  res.render('profile', { user });
});


router.get('/show/posts', isLoggedIn, async function (req, res, next) {
  const user = await userModel
    .findOne({ username: req.session.passport.user })
    .populate("posts")
  res.render('show', { user });
});


router.get('/add', isLoggedIn, async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });//this pulls out the data of the specific user that is logged in, 
  res.render('add', { user });
});

router.post('/createpost', isLoggedIn, upload.single("postimage"), async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  const post = await postModel.create({
    user: user._id,
    title: req.body.title,
    description: req.body.description,
    image: req.file.filename
  })
  user.posts.push(post._id);
  await user.save();
  res.redirect("/profile");
});


//uploading file and linking with user model
router.post('/fileupload', isLoggedIn, upload.single("image"), async function (req, res, next) {
  const user = await userModel.findOne({ username: req.session.passport.user });
  //finone is an inbuilt function, and as we know req.session.passport.user will have the username, when you login, by doing this we have found the user
  user.profileImage = req.file.filename;
  //this filename will contain the filename always, it is stored there, and we will store it in profile image
  await user.save();
  res.redirect('/profile');
});

//password authentication for registration,
router.post('/register', function (req, res, next) {
  const data = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname
  })

  userModel.register(data, req.body.password).then(function () {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/profile");
    })
  })
});

//password authentication for login
router.post('/login', passport.authenticate("local", {
  failureRedirect: '/',
  successRedirect: '/profile',
}), function (req, res, next) {
});


//logout code to logout, this directs to the / route
router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

module.exports = router;
