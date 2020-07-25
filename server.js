const express = require("express");
const bodyParser = require("body-parser");
const wagner = require("wagner-core");
const config = require("config");
const port = config.port;
const app = express();
const YAML = require('yamljs');
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load('./swagger.yaml'); 
let expressValidator = require("express-validator");
let router = express.Router();
let db = require("./db")(wagner);
require("./validation")(wagner);
require("./manager")(wagner);
let library = require("./routes")(app, router, wagner);;
app.use(expressValidator());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));
app.use("/api/v1/library", library)
db.then(function () {
  app.listen(port, (err) => {
    if (err) {
      return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
  });
}).catch(function (error) {
  console.log({ error });
  process.exit(1);
});
