var express = require('express');

var bookRouter = express.Router();
var sql = require('mssql'); //this gets the SAME instance as the one on app.js

var router = function(nav){

    bookRouter.route('/')
        .get(function(req, res){
            
            var request = new sql.Request();
            request.query('select * from books', function(err, recordset){
                if(!err){
                    res.render('bookListView', { 
                        title: 'books',
                        nav: nav,
                        books: recordset,
                    });
                }
            });
            
            
        });
        
    bookRouter.route('/:id')
        .get(function(req, res){

            var ps = new sql.PreparedStatement(/* [connection] */);
            ps.input('id', sql.Int);
            ps.prepare('select * from books where bookid = @id', function(err) {
                // ... error checks 
                if(err){
                    console.log(err);
                }
                ps.execute({id: req.params.id}, function(err, recordset) {
                    // ... error checks 
                    if(err){
                        console.log(err);
                    }
                    
                    ps.unprepare(function(err) {
                        // ... error checks 
                        if(err){
                            console.log(err);
                        }
                        console.log(recordset);

                        res.render('bookView', { 
                            title: 'books',
                            nav: nav,
                            book: recordset[0],
                        });
                    });
                });
            });

        });

        return bookRouter;
}


module.exports = router;