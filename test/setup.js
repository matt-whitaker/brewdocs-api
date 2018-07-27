require('dotenv').config({});
require('babel-register');
require('babel-polyfill');

global.expect = require('chai').expect;
global.sinon = require('sinon');
global.failResolve = () => Promise.reject(new Error('Test should not have resolved.'));
