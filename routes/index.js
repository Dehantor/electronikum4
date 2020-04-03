var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const app = express();
const Post = require('../models/post');
/* GET home page. */
const arr= ['Петров Иван','Сидоров Артем','Иванов Миша'];

let Articles = require('../models/article');
app.use(bodyParser.urlencoded({extended: true}))
app.get('/', function(req, res, next) {
  Articles.find({},function (err,articles) {
    if(err){
      console.log(err);
    }
    else{
      res.render('index', {
        title: 'Articles',
        articles: articles
      });
    }
  })

});

app.get('/article/:id',function (req,res,next) {
  Articles.findById(req.params.id,function (err,article) {
    res.render('article',{
      article:article
    })
   //res.render('book',{

   //})
  })
})

//edit
app.get('/article/edit/:id',function (req,res,next) {
  Articles.findById(req.params.id,function (err,article) {
    res.render('article_edit',{
      article:article
    })
    //res.render('book',{

    //})
  })

})
app.get('/book', function(req, res, next) {
  res.render('book',{title:"sad"});
});

app.get('/users', function(req, res, next) {
  res.render('users',{title:"ок"});
});

app.post('/users', (req, res, )=> {
  //arr.push(req.body.text);
  const {title,body,author}=req.body;
  Articles.create({
    title:title,
    author:author,
    body:body
  })
  res.redirect('/');
});
/*
var pgp = require("pg-promise");
var db = pgp("postgres://postgres:postgres@localhost:58161/qwe");

db.one("SELECT $1 AS value", 123)
    .then(function (data) {
      console.log("DATA:", data.value);
    })
    .catch(function (error) {
      console.log("ERROR:", error);
    });
*/
module.exports = app;
