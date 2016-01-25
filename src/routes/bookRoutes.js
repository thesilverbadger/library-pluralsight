var express = require('express');

var bookRouter = express.Router();

var router = function(nav){
    var books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        read: false
    },
    {
        title: 'The Martian',
        genre: 'SciFi',
        author: 'Andy Weir',
        read: true
    }];

    bookRouter.route('/')
        .get(function(req, res){
        res.render('bookListView', { 
                title: 'books',
                nav: nav,
                books: books,
            });
        });
        
    bookRouter.route('/:id')
        .get(function(req, res){
            var id = req.params.id;
            res.render('bookView', { 
                title: 'books',
                nav: nav,
                book: books[id],
            });
        });

        return bookRouter;
}


module.exports = router;