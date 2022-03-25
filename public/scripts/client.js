/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = (tweets) => {
    const $tweetContainer = $(".tweet-container");
    tweets.forEach((tweet) => {
      const $tweet = createTweetElement(tweet)
      $tweetContainer.prepend($tweet);
    });
  }

  const createTweetElement = (tweet) => {

    // to prevent XXS create espace function
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const $tweet = $(`<article class="tweet">
    <header class="user">
      <div class="icon-name">
        <img src="${tweet.user.avatars}">
        <p class="name">${tweet.user.name}</p>
      </div>
      <p class="account-name">${tweet.user.handle}</p>
    </header>
    <p class="message">${escape(tweet.content.text)}</p>
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
    $(".error").empty().hide();
    
 
    const serializedData = $(this).serialize();
    const textLength = $(this).children("#tweet-text").val().trim().length;
   
    // $.post(“/tweets”, serializedData) is same as $.ajax({url:, method:, data:})
    // you only want to add the latest tweet when you render 

    if (textLength === 0) {
      const $error2 = $(this).find("#error2");
      $error2.append($(`<i class="fa-solid fa-circle-exclamation"></i><span class="error">Tweet cannot be empty!</span>`)).slideDown("slow");
      return;
    }

    if (textLength > 140) {
      const $error1 = $(this).parent().find("#error1");
      $error1.append($(`<i class="fa-solid fa-circle-exclamation"></i><span class="error">Too many letters! Please keep your tweet under 140 characters!</span><i class="fa-solid fa-circle-exclamation"></i>`)).slideDown("slow");
      return;
    }

    $.ajax({
      url: "/tweets",
      method: "post",
      data: serializedData     
    }).then( () => {
      return $.get("/tweets");
    })
    .then( (tweetsData) => {
      const tweet = tweetsData.slice(-1);
      renderTweets(tweet);
      $newTweetForm.trigger("reset");
      $('.counter').text('140')
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
