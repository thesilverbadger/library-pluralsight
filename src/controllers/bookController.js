var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookController = function(bookService, nav){
    
    var middleware = function(req, res, next){
       //if(!req.user){
         //  res.redirect('/');
       //} 
       next();
    };
    
    var getIndex = function(req, res){
        var url = 'mongodb://192.168.99.100:32768/libraryDb';
        mongodb.connect(url, function(err, db){
            var collection = db.collection('books');
            collection.find({}).toArray(function(err, results){
                res.render('bookListView', { 
                    title: 'books',
                    nav: nav,
                    books: results 
                });
            });
        });
    };
    
    var getById = function(req, res){
        var url = 'mongodb://192.168.99.100:32768/libraryDb';
        mongodb.connect(url, function(err, db){
            var collection = db.collection('books');
            var id = new ObjectId(req.params.id);
            
            collection.findOne({_id: id}, function(err, results){
                
                bookService.getBookById(results.bookId, function(err, book){
                    results.book = book;
                    res.render('bookView', { 
                        title: 'books',
                        nav: nav,
                        book: results 
                    });
                });
            });
        });
    };
    
    return {
        middleware: middleware,
        getIndex: getIndex,
        getById: getById
    };
};

module.exports = bookController;