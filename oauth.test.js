var superagent = require("superagent")
var expect = require("expect.js")

var mongoskin = require("mongoskin")
var express = require('express');

var faker = require('faker');

var usersModule = require('./routes/users');

describe('test oauth', function(){
  var DatabaseCleaner 
  var databaseCleaner

  var id
  var originName

  before(function(done){
    DatabaseCleaner = require('database-cleaner')
    databaseCleaner = new DatabaseCleaner('mongodb')
    done()
  })

  beforeEach(function(done){
    done()
  })

  after(function(done){
    databaseCleaner.clean(usersModule.db, function(e, db){
      if(e) console.log(e)
      done()
    })  
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
      expect(e).to.eql(null)
      expect(res.body.token).not.to.eql(null)
      done()
    })
  })
})
