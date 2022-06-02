const mysql = require("mysql");
const config = require("config");
const Sequelize = require("sequelize");
function connect() {
  return new Promise((resolve, reject) => {
    let dbConfig = {
      host: config.mysql.host,
      user: config.mysql.user,
      password: config.mysql.password,
    };
    const connection = mysql.createConnection(dbConfig);
    connection.connect((err) => {
      if (err) return reject(err);
      //If schema doesn't exists then create then connect
      connection.query(
        `CREATE DATABASE IF NOT EXISTS ${config.mysql.database}`,
        function (err, result) {
          if (err) return reject(err);
          dbConfig["database"] = config.mysql.database;
          return resolve(result);
        }
      );
    });
  });
}
//connect();
module.exports = async wagner => {inde
    let sequelize = new Sequelize(
        config.mysql.database,
        config.mysql.user,
        config.mysql.password,
        config.mysql.options
    );
    const book = require("./models/book")(sequelize, Sequelize);
    wagner.factory('sequelize', function () {
        return sequelize;
      });
      wagner.factory('Book', function () {
        return book;
      })
     return await sequelize.sync()
};
