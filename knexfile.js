require('dotenv').config({});
require('babel-register');
require('babel-polyfill');

const {knexConfig} = require('./app/utils/database.js');

module.exports = knexConfig;
