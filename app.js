var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();
var port = process.env.PORT || 5000;

var nav = [{ 
                link: '/books', 
                text: 'Books' 
            }, 
            { 
                link: '/authors', 
                text: 'Authors' 
            }];
//routers
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

//static files
app.use(express.static('public'));
app.set('views', './src/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({ secret: 'library' }));
require('./src/config/passport')(app);

//views
app.set('view engine', 'ejs');

//routing
app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res){
	res.render('index', {title: 'Hello from render', 
        nav: [{ 
            link: '/books', 
            text: 'Books' 
            }, 
            { 
                link: '/authors', 
                text: 'Authors' 
            }]});
});

app.listen(port, function(err){
	console.log('running on server on port ' + port);
});