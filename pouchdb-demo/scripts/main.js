window.$ = window.jQuery = require('jquery');
repo = require("./scripts/repo.js");

$(function () {
  
    //Init the local DB and install demo data
    repo.initLocal('audio-guide-local')
      .then(function(result) {
           
            console.log("PouchDB was successfully initialized: " + JSON.stringify(result));

    }).then(function(result) {
        
            repo.loadDemoData().then(function(status) {
                
                console.log("Demo data successfully loaded" + JSON.stringify(status));
    
                repo.allTracks().then(function(data) {
                   
                    console.log(data);
                });
                
            }).catch(function(err) {
               
                console.warn("Demo data not loaded.");
                
                //Ignore
                repo.allTracks().then(function(data) {
                   
                    console.log(data);
                });
                
            });     
    });      
})
