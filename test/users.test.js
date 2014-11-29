var superagent = require("superagent")
var expect = require("expect.js")

var mongoskin = require("mongoskin")
var express = require('express');

var faker = require('faker');

var databaseModule = require('database-module');
db = databaseModule.db()

describe('express test api server', function(){

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
    databaseCleaner.clean(db, function(e, database){
      if(e) console.log(e)
      done()
    })  
  })

  it('create user', function(done){
    originName = faker.name.firstName()
    superagent.post('http://localhost:3001/collections/users')
    .send({
      name: originName,
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

  it('update users', function(done){
    var email = faker.internet.email()
    superagent.put('http://localhost:3001/collections/users/' + id)
    .send({
      email: email
    })
    .end(function(e, res){
      expect(e).to.eql(null)
      expect(res.body.email).to.eql(email)
      expect(res.body.name).to.eql(originName)
      done()
    })
  })

  it('delete user', function(done){
    superagent.del('http://localhost:3001/collections/users/' + id)
    .end(function(e, res){
      expect(e).to.eql(null)
      expect(res.body.length).to.equal(0)
      done()
    })
  })

})
