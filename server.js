var express = require('express');
var mongoose = require('mongoose');
var searchapi = require('./app/searchapi.js');
var dbsearches = process.env.MONGO_URI;
require('dotenv').config({
  silent: true
});

var app = express();

var db = mongoose.connection;
  var historySchema = new mongoose.Schema({
  search: String,
  date: String
});
var history = mongoose.model('history', historySchema);

mongoose.connect(dbsearches);
db.on('error', console.error.bind(console, 'connection error:'));
con
db.once('open', function() {
  // we're connected!
});

  searchapi(app, history);
  
  var port = process.env.PORT || 8080;
  app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
  });
