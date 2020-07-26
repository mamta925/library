let config = require("config");
module.exports = async (req, res, next) => {
  if (req.headers.apikey) {
    if (req.headers.apikey == config.secretKey) {
      next();
    } else {
      return res.status(401).json({ message: "Invalid or no token passed please Authorize header  with secretKey for more INfo : go to https://github.com/mamta925/library" });
    }
  } else {
    return res.status(401).json({ message: "Invalid or no token passed Authorize header with secretKey for more INfo : go to https://github.com/mamta925/library" });
  }
};
