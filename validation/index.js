module.exports = (wagner) => {

    wagner.factory('ExpressValidator', function() {
        return require("./validator");
    });

    wagner.factory('CommonAccess', function() {
        return require("./middleware");
    });
};
