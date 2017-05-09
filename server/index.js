'use strict';

// This file is the server

// Basic express and MongoDB setup:

const PORT          = 8080;
const express       = require('express');
const bodyParser    = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app           = express();
const MONGODB_URI = 'mongodb://localhost:27017/test';

// Use the body parser so our sever can translate request/response messages
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Link the Mongo database with the tweet rendering functions,
// as well as the express server routes

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.log(err);
  }
  const DataHelpers = require('./lib/data-helpers.js')(db);
  const tweetsRoutes = require('./routes/tweets')(DataHelpers);
  app.use('/tweets', tweetsRoutes);
  app.listen(PORT, () => {
    console.log('Example app listening on port ' + PORT);
  });
});

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.

// Mount the tweets routes at the '/tweets' path prefix: