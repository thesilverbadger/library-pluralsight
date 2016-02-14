var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongodb = require('mongodb').MongoClient;

module.exports = function(){
    passport.use(new LocalStrategy({
        usernameField: 'userName', //name of the HTML fields
        passwordField: 'password'
    }, function(username, password, done){
        //load from DB and authenticate
        var url = 'mongodb://192.168.99.100:32768/libraryDb';
        mongodb.connect(url, function(err, db){
            var collection = db.collection('users');
            collection.findOne({ username: username }, function(err, result){
               //todo: validate password
                if(result.password === password){
                    var user = result;     
                    done(null, user);  
                } else {
                    done(null, false);
                }
                
           });
       });

    }));
};