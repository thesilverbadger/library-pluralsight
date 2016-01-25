var express = require('express');
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

//static files
app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
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