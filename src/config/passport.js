var passport = require('passport');

module.exports = function(app){
    app.use(passport.initialize());
    app.use(passport.session());  
    
    passport.serializeUser(function(user, done){
        done(null, user) //to session
    });
    
    passport.deserializeUser(function(user, done){
        done(null, user);  //from session
    });
    
    require('./strategies/local.strategy')();
};