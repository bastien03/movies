var express = require('express');
var loki = require('lokijs');
var indexPage = require('./app/api/html/index/IndexPage.js');

//var db = new loki('loki.json');

var app = express();

app.get('/', indexPage.render);

console.log('Go to localhost:3000');
app.listen(3000);