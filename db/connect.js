const Sequelize = require("sequelize");
require('dotenv').config();

const connectDB = () => {

  return new Sequelize(
    process.env.DB_NAME,
    process.env.MYSQL_USERNAME,
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.MYSQL_HOST,
      dialect: 'mysql'
    }
  )
}

module.exports = connectDB
