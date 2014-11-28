var superagent = require("superagent")
var expect = require("expect.js")

var mongoskin = require("mongoskin")
var express = require('express');

var faker = require('faker');

// var databaseModule = require.main.require('./modules/database-module')
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
    db.collection("oauthusers").insert({username: "khang", password: "khang"}, function(){
      done()
    })
  })

  beforeEach(function(done){
    done()
  })

  after(function(done){
    // databaseCleaner.clean(db, function(e, db){
    //   if(e) console.log(e)
    //   done()
    // })  
  })

  it('get token', function(done){
    superagent.post('http://localhost:3001/oauth/token')
    .send({
      grant_type: "password",
      client_id: "khang",
      client_secret: "khang",
      username: "khang",
      password: "khang"
    })
    .end(function(e, res){
      console.log("status = " + res.status + res.body.token)
      expect(e).to.eql(null)
      expect(res.status).to.eql(200)
      expect(res.body.token).to.not.be.an('undefined')
      done()
    })
  })
})
