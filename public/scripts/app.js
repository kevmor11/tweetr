$(function () {

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

  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
    }).then(function(tweets) {
      let sort = tweets.sort(function(a, b) {
        // console.log(a);
        return b.created_at - a.created_at;
      })
      renderTweets(sort);
      $('.tweet-input').val('');
    })
  }

  loadTweets();

  $('form').on('submit', function(event){
    event.preventDefault();
    let $this = $(this);
    let tweettext = $this.find('[name=text]').val();

    if (tweettext === '') {
      $this.find('.too-short').slideDown(function() {
        setTimeout(function() {
          $this.find('.too-short').slideUp();
        }, 5000);
      });
      return;
    }
    if (tweettext.length > 140) {
      $this.find('.too-long').slideDown(function() {
        setTimeout(function() {
          $this.find('.too-long').slideUp();
        }, 5000);
      });
      return;
    }

    $.ajax({
      method: "POST",
      url: '/tweets',
      data: $this.serialize()
    }).then(function(tweets){
      window.location.reload(true);
    });
  })

})