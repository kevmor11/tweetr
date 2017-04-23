"use strict";

const { ObjectID } = require('mongodb');

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insert(newTweet);
      callback(null, true);
    },

    // Get all tweets in `db`
    getTweets: function(callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      });
    },

    // Add a like to a tweet
    likeTweets: function(tweetID, callback) {
      db.collection("tweets").update(
        { _id: ObjectID(tweetID) },
        { $inc: { likes: 1 }
        });
      callback(null, true);
    }
  };
}