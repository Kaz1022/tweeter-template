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
  
  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet)
      $(".tweet-container").append($tweet);
    });
  }

  function getDays(start) {
    //initialize dates with Date object
    const date1 = start;
    const date2 = new Date();

    // calculation for converting a day into milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // calculation for the time difference between start and last
    const diffTime = date2.getTime() - date1;

    // calculation for the days between start and last
    const diffDays = Math.round(diffTime / oneDay);
    // return number of days
    return diffDays;
  };
  
  const createTweetElement = function(tweet) {
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
      <p class="dates">${getDays(tweet.created_at)} days ago</p>
      <div class="icons">
        <i class="icon fa-solid fa-flag"></i>
        <i class="icon fa-solid fa-retweet"></i>
        <i class="icon fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);
    return $tweet;
  };

  renderTweets(data);

});