var http = require('http');
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});

var goodreadsService = function(){
  
  var getBookById = function(id, callback){
      var options = {
          host: 'www.goodreads.com',
          path: '/book/show/' + id + '?format=xml&key=mN1DyVoFS4cfbCMh5HmnpA'
      };
      
      http.request(options, function (response){
        var str = '';
        response.on('data', function(chunk){
            str += chunk;
        }); 
        
        response.on('end', function(){
            console.log(str);
            parser.parseString(str, function(err, result){
                callback(null, result.GoodreadsResponse.book);
            });
        });
      }).end();
      
  };
  
  return {
      getBookById: getBookById
  } 
};

module.exports = goodreadsService;