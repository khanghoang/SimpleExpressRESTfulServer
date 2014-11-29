var superagent = require("superagent")
var expect = require("expect.js")

var mongoskin = require("mongoskin")
var express = require('express');

var faker = require('faker');
var async = require('async');

var databaseModule = require('database-module');
db = databaseModule.db()

describe('Test OAuth 2 server', function(){
  var DatabaseCleaner 
  var databaseCleaner

  var id
  var originName

  before(function(done){
    DatabaseCleaner = require('database-cleaner')
    databaseCleaner = new DatabaseCleaner('mongodb')

    // set up test env
    async.parallel([
      function(callback){
        db.collection("oauthusers").insert({username: "khang", password: "khang"}, function(e, db){
      callback()
        })
    },
      function(callback){
        db.collection("oauthclients").insert({clientId: "khang", clientSecret: "khang"}, function(e, db){
        callback()
        })
      }],
    function(err, results){
      done()
    })
  })

  beforeEach(function(done){
    done()
  })

  after(function(done){
    databaseCleaner.clean(db, function(e, db){
      if(e) console.log(e)
      done()
    })  
  })

  it('get token', function(done){
    superagent.post('http://localhost:3001/oauth/token')
    .type("form")
    .send({
      grant_type: "password",
      client_id: "khang",
      client_secret: "khang",
      username: "khang",
      password: "khang"
    })
    .end(function(e, res){
      // console.log("status = " + res.status + res.body.access_token)
      expect(e).to.eql(null)
      expect(res.status).to.eql(200)
      expect(res.body.access_token).to.not.be.an('undefined')
      done()
    })
  })
})
