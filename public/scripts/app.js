$(function () {

  function createTweetHeader(tweet) {
    let $avatar = $("<img>", { src: tweet.user.avatars.regular }).addClass("avatar");
    let $username = $("<h2>", { text: tweet.user.name }).addClass("demo-header");
    let $handle = $("<p>", { text: tweet.user.handle }).addClass("handle");

    let $header = $("<header>").addClass("tweet-header").append([$avatar, $username, $handle]);
    return $header;
  }

  function createTweetBody(tweet) {
    let $tweet = $("<p>", { text: tweet.content.text }).text(tweet.content.text).addClass("tweet-text");
    return $tweet;
  }

  function createTweetFooter(tweet) {
    let formattedTime = moment(tweet.created_at).fromNow();
    let $footer = $(`
      <footer class="footer">
      <p class="footer">${formattedTime}</p>
      <i class="fa fa-heart icon" aria-hidden="true"></i>
      <i class="fa fa-retweet icon" aria-hidden="true"></i>
      <i class="fa fa-flag icon" aria-hidden="true"></i>
      </footer>
      `)
    return $footer;
  }

  // Append all elements of the newly created tweet into an article tag
  function createTweetElement(tweet) {
    let $article = $("<article>").addClass("demo-tweet").append([createTweetHeader(tweet), createTweetBody(tweet), createTweetFooter(tweet)]);
    return $article;
  }

  // Renders the new list of all tweets to include the newly created tweet
  // and adds them to the tweet container
  function renderTweets(tweets) {
    tweets.forEach( function(tweet) {
      $('#tweets-container').append(createTweetElement(tweet));
    })
  }

  // Sorts all tweets by most recently created
  function sortTweets(tweets) {
      return tweets.sort(function(a, b) {
        return b.created_at - a.created_at;
      })
  }

  // Empties the input field
  function emptyMyBox() {
    $('.tweet-input').val('');
  }

  // The AJAX call refactored into a function
  function AJAXCall(url, method, data, dataType) {
    return $.ajax({url, method, data, dataType});
  }

  // Get all tweets, sort them and render them to the page
  // this occurs each time the page is loaded/reloaded
  function loadTweets() {
    AJAXCall("/tweets","GET")
      .then(sortTweets)
      .then(renderTweets)

    // $.ajax({
    //   method: 'GET',
    //   url: '/tweets',
    // }).then(function(tweets) {
    //   renderTweets(sortTweets(tweets));
    //   $('.tweet-input').val('');
    // })
  }

  loadTweets();

  // When a new tweet is submitted, put the tweet text into a variable
  $('form').on('submit', function(event){
    event.preventDefault();
    let $this = $(this);
    let tweettext = $this.find('[name=text]').val();

    // If the text area is empty, display a temporary message that
    // the tweet cannot be empty
    if (tweettext === '') {
      let shortMessage = $this.find('.too-short');
      shortMessage.slideDown(function() {
        setTimeout(function() {
          shortMessage.slideUp();
        }, 5000);
      });
      return;
    }
    // If the tweet is over 140 characters, display a temporary message that
    // the tweet cannot be that long
    if (tweettext.length > 140) {
      let longMessage = $this.find('.too-long');
      longMessage.slideDown(function() {
        setTimeout(function() {
          longMessage.slideUp();
        }, 5000);
      });
      return;
    }

    // Encodes tweet as a text string in standard URL-encoded notation
    // For example: text=this is a tweet
    let tweetData = $this.serialize()

    // Empties entire tweet container so it can be reloaded with the new database
    // of tweets, including the newly created tweets. This is not a very
    // ideal way of doing things, but it works fine for this project.
    function emptyContainer(sortedTweets) {
      $('#tweets-container').empty();
      return sortedTweets;
    }

    // When a new tweet is posted, the database is sorted, the tweet container is
    // emptied, the updated tweet database is rendered into the container,
    // and the text area is emptied
    AJAXCall("/tweets","POST",tweetData)
      .then(sortTweets)
      .then(emptyContainer)
      .then(renderTweets)
      .then(emptyMyBox)

    // $.ajax({
    //   method: "POST",
    //   url: '/tweets',
    //   data: $this.serialize()
    // }).then(function(tweets){
    //   $('#tweets-container').empty();
    //   renderTweets(sortTweets(tweets));
    // });
  // })
  })
})