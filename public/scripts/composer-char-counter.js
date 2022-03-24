$(document).ready(function() {

  $("#tweet-text").on("input", function(){
    // tweet element values are texts, we want the length
    const maxLength = 140;
    let currentLength = ($(this).val().trim().length);
    let remaining = maxLength - currentLength;
    // use jQuery to traverse the DOM tree from that node/element
    let counter = ($(this).next().children(".counter"));
    counter.html(remaining);

    if (remaining < 0) {
      // counter.css('color', 'red')
      counter.addClass("myClass");
    } else {
      // counter.css('color', '#545149')
      counter.removeClass("myClass");
    }
  })

});