var express = require("express");
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var router = function(nav){
  
  var books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false,
        bookId: 656
    },
    {
        title: 'The Martian',
        genre: 'SciFi',
        author: 'Andy Weir',
        read: true
    }];
    
  adminRouter.route('/addBooks')
    .get(function(req, res){
  
       var url = 'mongodb://192.168.99.100:32770/libraryDb';
       mongodb.connect(url, function(err, db){
           var collection = db.collection('books');
           collection.insertMany(books, function(err, results){
               res.send(results);
               db.close();
           });
       });

    });
  
  return adminRouter;  
};

module.exports = router;