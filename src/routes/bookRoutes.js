var express = require('express');
var bookRouter = express.Router();

var router = function(nav){

    var bookService = require('../services/goodreadsService')();
    var bookController = require('../controllers/bookController')(bookService, nav);

    //secures all the book routes - this is middleware
    bookRouter.use(bookController.middleware);

    bookRouter.route('/')
        .get(bookController.getIndex);
        
    bookRouter.route('/:id')
        .get(bookController.getById);

    return bookRouter;
};


module.exports = router;