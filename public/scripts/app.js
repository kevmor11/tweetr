/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(function () {

var tweetData = {
  "user": {
    "name": "Newton",
    "avatars": {
      "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
      "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
      "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
    },
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function createTweetHeader(tweet) {
  let $avatar = $("<img>", { src: tweet.user.avatars.regular }).addClass("avatar");
  let $username = $("<h2>", { text: tweet.user.name }).addClass("demo-header");
  let $handle = $("<p>", { text: tweet.handle }).addClass("handle");

  let $header = $("<header>").addClass("tweet-header").append([$avatar, $username, $handle]);
  return $header;
}

function createTweetBody(tweet) {
  let $tweet = $("<p>", { text: tweet.content.text }).text(tweet.content.text).addClass("tweet-text");
  return $tweet;
}

function createTweetFooter(tweet) {
  let $footer = $(`
        <footer class="footer">
          <p class="footer">${tweet.created_at}</p>
          <i class="fa fa-heart icon" aria-hidden="true"></i>
          <i class="fa fa-retweet icon" aria-hidden="true"></i>
          <i class="fa fa-flag icon" aria-hidden="true"></i>
        </footer>
    `)
  return $footer;
}

function createTweetElement(tweet) {
  let $article = $("<article>").addClass("demo-tweet").append([createTweetHeader(tweetData), createTweetBody(tweetData), createTweetFooter(tweetData)]);
  // console.log($article);
  return $article;
}

function renderTweets(tweets) {
  for (let i in tweets) {
    $('#tweets-container').append(createTweetElement(i));
  }
}

renderTweets(data);

})