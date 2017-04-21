$(function () {

  function AJAXCall(url, method, data, dataType) {
    return $.ajax({url, method, data, dataType});
  }

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

  function createTweetElement(tweet) {
    let $article = $("<article>").addClass("demo-tweet").append([createTweetHeader(tweet), createTweetBody(tweet), createTweetFooter(tweet)]);
    return $article;
  }

  function renderTweets(tweets) {
    tweets.forEach( function(tweet) {
      $('#tweets-container').append(createTweetElement(tweet));
    })
  }

  function sortTweets(tweets) {
      return tweets.sort(function(a, b) {
        return b.created_at - a.created_at;
      })
  }

  function emptyMyBox() {
    $('.tweet-input').val('');
  }

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

  $('form').on('submit', function(event){
    event.preventDefault();
    let $this = $(this);
    let tweettext = $this.find('[name=text]').val();

    if (tweettext === '') {
      let shortMessage = $this.find('.too-short');
      shortMessage.slideDown(function() {
        setTimeout(function() {
          shortMessage.slideUp();
        }, 5000);
      });
      return;
    }
    if (tweettext.length > 140) {
      let longMessage = $this.find('.too-long');
      longMessage.slideDown(function() {
        setTimeout(function() {
          longMessage.slideUp();
        }, 5000);
      });
      return;
    }

    let tweetData = $this.serialize()

    function emptyContainer(sortedTweets) {
      $('#tweets-container').empty();
      return sortedTweets;
    }

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