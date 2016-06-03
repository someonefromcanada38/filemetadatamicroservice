var express = require('express');
var mongo = require('mongodb');
var urlapi = require('./app/urlShortener.js');
var dburl = 'mongodb://admin:password@ds015403.mlab.com:15403/urls'

var app = express();

mongo.MongoClient.connect(dburl, function(err, db) {

  if (err) {
    throw new Error('Error: Database not connected');
  } else {
    console.log('Connected to MongoDB');
  }
  
  db.createCollection("sites", {
    capped: true,
    size: 500000,
    max: 500
  });
  
  urlapi(app, db);
  
  var port = 5000;
  app.listen(port, function() {
    console.log('Node.js listening on port ' + port);
  });
  
});