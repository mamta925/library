
module.exports = function(wagner) { 
    wagner.factory('BookManager', function() {
        var BookManager = require('./book-manager');
        return new BookManager(wagner);
    });
}