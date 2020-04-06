var express = require('express');
var router = express.Router();

let User = require('../models/user');

//register
router.get('/register',function (req,res) {
    res.render('register');
})
router.get('/book',function (req,res) {
    res.render('book');
})

module.exports = router;
