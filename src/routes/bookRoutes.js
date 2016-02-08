var express = require('express');
var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var bookRouter = express.Router();

var router = function(nav){

    bookRouter.route('/')
        .get(function(req, res){
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
        });
        
    bookRouter.route('/:id')
        .get(function(req, res){
            var url = 'mongodb://192.168.99.100:32768/libraryDb';
            mongodb.connect(url, function(err, db){
                var collection = db.collection('books');
                var id = new ObjectId(req.params.id);
                collection.findOne({_id: id}, function(err, results){
                    res.render('bookView', { 
                        title: 'books',
                        nav: nav,
                        book: results 
                    });
                });
            });
        });

        return bookRouter;
};


module.exports = router;