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
        .all(function(req, res, next){
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
                        if(recordset.length === 0){
                            res.send(404, "Not Found");
                        } else {
                            req.book = recordset[0];
                            next();
                        }

                    });
                });
            });
            next();
        })
        .get(function(req, res){

            res.render('bookView', {
                title: 'Books',
                nav: nav,
                book: req.book
            })

        });

        return bookRouter;
}


module.exports = router;