//Imports
PouchDB = require("pouchdb");
Q = require("q");

//Global variables
db = null;
remoteDB = null;


/**
 * Destry the repository DB
 */
function _destroy(dbName) {
    
     db = new PouchDB(dbName);
     return db.destroy();
}

/**
 * Initialize the repository DB without sync.
 */
function _initLocal(dbName) {
      
        db = new PouchDB(dbName);
        return db.info();
}


/**
 * Initialize the repository DB by also setting up sync. to a remote DB
 */
function _init(dbName, remoteDBUrl) {    
    
        _initLocal(dbName);
        
        if (remoteDBUrl) {
    
            console.log("Initializing remote database ...");
            remoteDB = new PouchDB(remoteDBUrl);
             
            db.sync(remoteDB, {
                live: true,
                retry: true
            }).on('change', function (change) {
                console.log("Something changed ...");
            }).on('paused', function (info) {
                console.log("The replication was paused. Did you loose connection?");
            }).on('active', function (info) {
                console.log("The replication changed to be active again.");
            }).on('error', function (err) {
                console.log("A sync. error occoured!");
            });
    
            return { "local" : db, "remote" : remoteDB };

        } else {
         
            return { "local" : db };
        }
}

/**
 * Add a track to repo DB
 */
function _addTrack(id, name, desc, audio) {
    
    var track = { 
                  "_id" : "track::" + id,
                  "id" : id,
                  "name" : name,
                  "desc" : desc,
                  "audio" : audio 
                }
    
    return db.put(track);
}
                       

/**
 * Get a track from the repo DB
 */
function _getTrack(id) {

        return db.get("track::" + id);
}


/**
 * Load demo data
 */
function _loadDemoData() {
     
    return Q.all(
        _addTrack("1", "Demo track", "This is a first demo track", null),
        _addTrack("2", "Demo track", "This is a second demo track", null)   
    )
}

/**
 * Export some of the functions
 */
module.exports = {

    initLocal: _initLocal,
    init : _init,
    getTrack : _getTrack,
    addTrack : _addTrack,
    loadDemoData : _loadDemoData,
    destroy : _destroy
}
