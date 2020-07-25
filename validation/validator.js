const { check, validationResult } = require("express-validator/check");

module.exports = (req, res, next) => {
  const express_errors = validationResult(req);
  const errObj = {};
  if (!express_errors.isEmpty()) {
    let error = [];
    for (var i in express_errors.array()) {
      let param = express_errors.array()[i].param;
      if (express_errors.array()[i].param.indexOf(".") !== 0) {
        param = getParam(param);
      }
      var msg = param + " " + express_errors.array()[i].msg;
      error.push(msg);
    }
    errObj.error = error[0];
    errObj.status_code = 400;
    return res.status(400).json(errObj);
  } else {
    next();
  }
};
function getParam(param) {
  return  param;
}