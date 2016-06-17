var assert = require('chai').assert;
var repo = require('../scripts/repo.js');


describe('destroy()', function() {

    it('should destroy the DB', function(done) {
    
        repo.destroy('test-local-db').then(function(result) {
           
            console.log(result);  
            
            //TODO: Assert
            
            done();
        });
    
    });
});


describe('initLocal()', function() {

    it('should return an info promise', function(done) {
    
        repo.initLocal('test-local-db').then(function(result) {
           
            assert.equal(result.db_name, 'test-local-db');
            
            done();
        });
    
    });
});


describe('addTrack()', function() {
    
    it('should be possible to add a document', function(done) {
       
        repo.addTrack("test", "Test track", "This is a test track", null).then(function(result) {
            
            console.log(result);
            assert.equal(result.ok, true);
            done();
        
        }).catch(function(error) {
           
            console.error(error);
            done(error);            
            
        });
    });
});

describe('loadDemoData()', function() {
    
    it('should be possible load the demo data', function(done) {
       
        repo.loadDemoData().then(function(result) {
        console.log(result);
	    done();
        
        }).catch(function(error) {
           
            console.error(error);
            done(error);
        });
    });
});
