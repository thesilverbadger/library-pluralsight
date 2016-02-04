var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

<<<<<<< HEAD
var sql = require('mssql');
var config = {
  user: 'library@cantiaci',
  password: 'move_password_to_config',
  server: 'cantiaci.database.windows.net',
  database: 'library',
  options: {
      encrypt: true
  }  
};

sql.connect(config, function(err){
    if(err) {
        console.log('connect error:' + err);
    }
});



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

=======
>>>>>>> parent of e3e42da... Routing and dynamic constructor injected nav
//static files
app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

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