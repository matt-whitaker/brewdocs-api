const { clone } = require('ramda');
require('dotenv').config({});
require('babel-register');
require('babel-polyfill');

const { knexConfig } = require('./app/utils/database.js');

module.exports = Object.assign(clone(knexConfig), {
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
});
