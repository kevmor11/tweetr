'use strict';

const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = 'mongodb://localhost:27017/test';

MongoClient.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // ==> We have a connection to the 'test-tweets' db,
  //     starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);
  //this is an 'entry point' for
  // a database-connected application!

  // Lets get all the tweets (find)
  function getTweets(callback) {
    db.collection('tweets').find().toArray((err, tweets) => {
      if (err) {
        return callback(err);
      }
      callback(null, tweets)
    });
  }

  getTweets((err, tweets) => {
    if (err) throw err;

    console.log('logging each tweet:');
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
  });
  // ==> At the end, we close the connection:
});