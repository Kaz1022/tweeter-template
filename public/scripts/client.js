/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1647638170555
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];
  
  const renderTweets = (tweets) => {
    const $tweetContainer = $(".tweet-container");
    tweets.forEach((tweet) => {
      const $tweet = createTweetElement(tweet)
      $tweetContainer.prepend($tweet);
    });
  }

  const createTweetElement = (tweet) => {
    const $tweet = $(`<article class="tweet">
    <header class="user">
      <div class="icon-name">
        <img alt="pfp">
        <p class="name">${tweet.user.name}</p>
      </div>
      <p class="account-name">${tweet.user.handle}</p>
    </header>
    <p class="message">${tweet.content.text}</p>
    <footer>
      <p class="dates">${timeago.format(tweet.created_at)}</p>
      <div class="icons">
        <i class="icon fa-solid fa-flag"></i>
        <i class="icon fa-solid fa-retweet"></i>
        <i class="icon fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);
    return $tweet;
  };

  const $newTweetForm = $("form");

  $newTweetForm.submit(function(event) {
    event.preventDefault();
    const serializedData = $(this).serialize();
    console.log(serializedData);
    // $.post(“/tweets”, serializedData) is same as $.ajax({url:, method:, data:})
    // you only want to add the latest tweet when you render 
    // you want to clear out the texts in the form, use trigger reset
    $.ajax({
      url: "/tweets",
      method: "post",
      data: serializedData
    }).then( () => {
      return $.get("/tweets");
    }).then( (tweetsData) => {
      const tweet = tweetsData.slice(-1);
      renderTweets(tweet);
      $newTweetForm.trigger("reset");
    })
  })

  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET" 
      }).then(function (tweetsData) {
        renderTweets(tweetsData);
      });
    }
  
    loadTweets();

});
