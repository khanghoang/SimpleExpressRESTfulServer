var superagent = require("superagent")
var expect = require("expect.js")

var mongoskin = require("mongoskin")
var express = require('express');

var faker = require('faker');

var usersModule = require('./routes/users');

describe('express test api server', function(){

  var DatabaseCleaner 
  var databaseCleaner

  var id

  before(function(done){
    DatabaseCleaner = require('database-cleaner')
    databaseCleaner = new DatabaseCleaner('mongodb')
    done()
  })

  beforeEach(function(done){
    done()
  })

  after(function(done){
    console.log(usersModule.db())
    databaseCleaner.clean(usersModule.db(), function(e, db){
      if(e) console.log(e)
      console.log(usersModule.db())
      done()
    })  
  })

  it('create user', function(done){
    superagent.post('http://localhost:3001/collections/users')
    .send({
      name: "This is very espencial " + faker.name.firstName(),
      email: faker.internet.email()
    })
    .end(function(e, res){
      expect(e).to.eql(null)
      expect(typeof res.body).to.eql('object')
      id = res.body[0]._id
      done()
    })
  })

  it('get list users', function(done){
    superagent.get('http://localhost:3001/collections/users')
    .end(function(e, res){
      expect(e).to.eql(null)
      expect(res.body.length).to.be.above(0)
      done()
    })
  })
  
  it('get users details by id', function(done){
    superagent.get('http://localhost:3001/collections/users/' + id)
    .end(function(e, res){
      expect(e).to.eql(null)
      expect(res.body._id).to.eql(id)
      done()
    })
  })

})
