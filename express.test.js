var superagent = require("superagent")
var expect = require("expect.js")

var mongoskin = require("mongoskin")
var express = require('express');
var app = express();

process.env.NODE_ENV = "test"
var dbConnectString = 'mongodb://localhost:27017/test'
var db = mongoskin.db(dbConnectString, {safe: true})

describe('express test api server', function(){

  var DatabaseCleaner 
  var databaseCleaner

  beforeEach(function(done){
    DatabaseCleaner = require('database-cleaner')
    databaseCleaner = new DatabaseCleaner('mongodb')
    done()
  })

  afterEach(function(done){
    databaseCleaner.clean(db, function(e, db){
      done()
    })  
  })

  it('create user', function(done){
    superagent.post('http://localhost:3000/collections/users')
    .send({
      name: "This is very espencial Huy",
      email: "Khang@gmail.com"
    })
    .end(function(e, res){
      expect(e).to.eql(null)
      expect(typeof res.body).to.eql('object')
      done()
    })
  })


})
