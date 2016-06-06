window.$ = window.jQuery = require('jquery');

$(function () {

    //Vars
    var contentPane = $("#contet-pane");


    //Init
    console.log("Loading content ...");

    function loadWelcomeMessage() {

      contentPane.load("views/welcome.html");

    }

    loadWelcomeMessage();


    //Event handling
    $("#welcome-item").click(function(){

          console.log("Welcome clicked");
          loadWelcomeMessage();
    });

});
