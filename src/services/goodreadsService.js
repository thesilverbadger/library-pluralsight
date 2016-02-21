var goodreadsService = function(){
  
  var getBookById = function(id, callback){
      
      callback(null, { description: "Our Desc" })
  };
  
  return {
      getBookById: getBookById
  } 
};

module.exports = goodreadsService;