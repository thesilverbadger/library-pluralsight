var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function(){
    
    authRouter.route('/signUp')
    .post(function(req, res){
        console.log(req.body);
        //login is added by passport
        var url = 'mongodb://192.168.99.100:32768/libraryDb';
        mongodb.connect(url, function(err, db){
            var collection = db.collection('users');
            var user = {
                username: req.body.userName,
                password: req.body.password
            };
            
            collection.insert(user, function(err, results){
                req.login(results.ops[0], function(){
                    res.redirect('/auth/profile');
                }); 
            });
        });
    });
    
    authRouter.route('/signin')
    .post(passport.authenticate('local', {
        failureRedirect: '/'
    }), function(req, res){
        res.redirect('/auth/profile');
    });
    
    authRouter.route('/profile')
    .get(function(req, res){
        res.json(req.user);    
    });
    
    return authRouter;
};

module.exports = router;