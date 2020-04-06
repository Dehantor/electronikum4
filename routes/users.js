var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
let User = require('../models/user');

//register
router.get('/register',function (req,res) {
  res.render('register');
})

router.post('/register',function (req,res) {
  const name = req.body.name;
  const email = req.body.email;
  const login = req.body.login;
  const password = req.body.password;
  const confirmPass = req.body.confirmPass;
  req.checkBody('name',"Name is required").notEmpty();
  req.checkBody('email',"Email is required").notEmpty();
  req.checkBody('login',"Login is required").notEmpty();
  req.checkBody('password',"Password is required").notEmpty();
  req.checkBody('confirmPass',"ConfirmPass is required").equals(req.body.password);
  req.checkBody('email',"Email is correct").isEmail();


  let errors = req.validationErrors();
  if(errors){
    res.render('register',{
      errors: errors
    })
  }
  else {
    let newUser = new User({
      name:name,
      email:email,
      login:login,
      password:password
    })

    bcrypt.genSalt(10, function (err,salt) {
      bcrypt.hash(newUser.password, salt, function (err,hash) {
        if(err){
          console.log(err);
        }

        newUser.password = hash;
        newUser.save().then(function (err,result) {
          //console.log("err");
          req.flash('success',"Вы зарегистрированы и можете войти под своим логином");
          res.redirect('login');
          /*if(err){
            console.log("err");
            console.log(err);
          }
          else{
            req.flash('success',"Вы зарегистрированы и можете войти под своим логином");
            req.redirect('users/login');
          }*/
          })


      });
    })
  }

})

router.get('/login',function (req,res) {
  res.render('login');
})

router.post('/login',function (req,res) {
  const login = req.body.login;
  const password = req.body.password;
  var pas;
  req.checkBody('login',"Login is required").notEmpty();
  req.checkBody('password',"Password is required").notEmpty();
  let errors = req.validationErrors();
  if(errors){
    res.render('login',{
      errors: errors
    })
  }
  else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) {
          console.log(err);
        }
        pas = hash;
      })
    });

  }})
module.exports = router;
