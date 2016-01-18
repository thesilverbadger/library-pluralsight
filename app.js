var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

//static files
app.use(express.static('public'));
app.set('views', './src/views');

var handlebars = require('express-handlebars')
app.engine('.hbs', handlebars({extname: '.hbs'}))
app.set('view engine', '.hbs');

app.get('/', function(req, res){
	res.render('index', {title: 'Hello from render', list: ['a', 'b']});
});

app.listen(port, function(err){
	console.log('running on server on port ' + port);
});