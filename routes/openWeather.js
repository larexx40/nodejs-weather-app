const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');
const request = require('request');
const controller = require('../controller/openWeather');

var openWeather = express.Router();

openWeather.get('/', controller.getHome);
openWeather.get('/find', controller.findLocation);
openWeather.post('/find', controller.findLocation);

module.exports = openWeather;