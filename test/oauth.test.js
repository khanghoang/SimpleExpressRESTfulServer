var superagent = require("superagent")
var expect = require("expect.js")

var mongoskin = require("mongoskin")
var express = require('express');

var async = require('async');
var faker = require('faker');

var databaseModule = require('database-module');
db = databaseModule.db()

describe('Test OAuth 2 server', function(){
  var DatabaseCleaner 
  var databaseCleaner

  var id
  var originName
  
  var clientID,
  clientSecret,
  clientUsername,
  clientPassword,
  grantType

  before(function(done){
    DatabaseCleaner = require('database-cleaner')
    databaseCleaner = new DatabaseCleaner('mongodb')

    clientID = "authorizedClientId"
    clientSecret = faker.internet.password()
    clientUsername = faker.internet.userName()
    clientPassword = faker.internet.password()
    grantType = "password"

    // set up test env
    async.parallel([
      function(callback){
        db.collection("oauthusers").insert({username: clientUsername, password: clientPassword}, function(e, db){
      callback()
        })
    },
      function(callback){
        db.collection("oauthclients").insert({clientId: clientID, clientSecret: clientPassword}, function(e, db){
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
    done()
    // databaseCleaner.clean(db, function(e, db){
    //   if(e) console.log(e)
    //   done()
    // })  
  })

  it('get token', function(done){
    var params = {
      grant_type: grantType,
      //TODO: refactor the oauth/models to get 
      //authorized client id
      client_id: clientID,
      client_secret: clientSecret,
      username: clientUsername,
      password: clientPassword
    }

    console.log(params)

    superagent.post('http://localhost:3001/oauth/token')
    .type("form")
    .send(params)
    .end(function(e, res){
      expect(e).to.eql(null)
      expect(res.status).to.eql(200)
      expect(res.body.access_token).to.not.be.an('undefined')
      done()
    })
  })
})
