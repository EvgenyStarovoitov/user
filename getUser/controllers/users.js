var express = require('express')
    , router = express.Router()
    , user = require('../models/user')
    , bodyParser = require('body-parser')
    , db = require('../public/libs/db')
    , urlencodedParser = bodyParser.urlencoded({extended: false});

//all routers handle from /users links, full path like app/users/add + req.body

router.post('/add', urlencodedParser, function (req, res) {
    console.log(req.body);
    var users = db.get().collection('users');
    var newUser = { 
        name : req.body.name,
        email : req.body.email,
        dep : req.body.dep,
        tel_1 : req.body.tel_1,
        tel_2 : req.body.tel_2,
        date : new Date().toString()
    };
    user.create(newUser, users, function (err, result) {
       if(err) {
           console.log(err);
           return res.sendStatus(500);
       };
       console.log('user successfully added');
       res.redirect('/');
    });
});

router.get('/search', urlencodedParser, function(req, res) {
    console.log(req.query.query);
    var users = db.get().collection('users'); 
    var query = {
        name: req.query.query,
    };
    user.getUser(query, users, function (err, result) {
        if(err){
            console.log(err);
            return res.sendStatus(500);
        };
        res.send(result);
    });
});

router.get('/all', function(req, res) {
    var users = db.get().collection('users'); 
    user.getAllUsers(users, function (err, result) {
        if(err){
            console.log(err);
            return res.sendStatus(500);
        };
        res.send(result);
    });
});

router.get('/', function(req, res) {
    res.render('users');
});

module.exports = router;