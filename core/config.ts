// import * as dotenv from 'dotenv';
// dotenv.config();
require('dotenv').config();
// const databaseInteferace = require('./interface');

module.exports = {
  appEnv: process.env.NODE_ENV,
  port: process.env.PORT || 2010,
  database: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    // dialect: process.env.DB_DIALECT,
    // dialect: 'postgres',
    dialect: 'mysql',
    timezone: '+01:00',
    logging: true,
  },
};
