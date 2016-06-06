window.$ = window.jQuery = require('jquery');

$(function () {

    //Init
    console.log("Handling toolbar ...");


    //Event handling
    $("#content-btn").click(function(){
      console.log("Content Button clicked");
    })

    $("#guestbook-btn").click(function(){
      console.log("Guestbook Button clicked");
    })
});
