var express = require('express');
var router = express.Router();


/* GET home page. */

let Articles = require('../models/article');

router.get('/', function(req, res, next) {
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

router.get('/article/:id',function (req,res,next) {
  Articles.findById(req.params.id,function (err,article) {
    res.render('article',{
      article:article
    })
   //res.render('book',{

   //})
  })
})

//edit
router.get('/article/edit/:id',function (req,res,next) {
  Articles.findById(req.params.id,function (err,article) {
    res.render('article_edit',{
      title:'Edit Article',
      article:article
    })
  })
})

router.delete('/article/:id',function (req,res) {
  let query = {_id:req.params.id}
  var q = req.params.title;
  console.log(req.params.title);
  Articles.remove(query,function (err) {
    if(err)
    {
      console.log(err);
      return;
    }
    else
    {
      req.flash('danger',"Remove ");
      res.send('Success');
    }
  })
})

router.get('/book', function(req, res, next) {
  res.render('book',{title:"sad"});
});

router.get('/users', function(req, res, next) {
  res.render('users',{title:"ок"});
});

router.post('/users', (req, res, )=> {
  //arr.push(req.body.text)
  req.checkBody('title','Title is not').notEmpty();
  req.checkBody('author','Author is not').notEmpty();
  req.checkBody('body','Body is not').notEmpty();

  let errors = req.validationErrors();
  if(errors){
    console.log(errors);
    res.render('users',{
     title:"Article add",
     errors:errors
    })
  }
  else
  {
    const {title,body,author}=req.body;
    Articles.create({
      title:title,
      author:author,
      body:body
    })
    req.flash('success','Article add');
    res.redirect('/');
  }
});
router.post('/article/edit/:id', (req, res, )=> {
  //arr.push(req.body.text);
  const {title,body,author}=req.body;
  let article = {}
  article.title = title;
  article.author = author;
  article.body = body;
  let query = {_id:req.params.id};
  Articles.update(query,article, function (err) {
    if(err){
      console.log(err);
      return;
    }
    else
      req.flash('success','Update student');
      res.redirect('/');
  });

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
module.exports = router;
