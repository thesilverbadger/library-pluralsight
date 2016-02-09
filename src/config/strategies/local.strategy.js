var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(){
    passport.use(new LocalStrategy({
        usernameField: 'userName', //name of the HTML fields
        passwordField: 'password'
    }, function(username, password, done){
        //load from DB
        var user = {
            username: username,
            password: password
        };
        
        done(null, user);
    }));
};