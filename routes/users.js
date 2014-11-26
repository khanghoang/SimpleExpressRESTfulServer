var express = require('express');
var mongoskin = require('mongoskin')

var app = express()

var dbConnectString 
var db

exports.connectUser = function(req, res, next){
  var env = app.get("env")
  console.log(env)
  if("test" === env) {
    dbConnectString = 'mongodb://localhost:27017/memcard-test'
  } else if ("development" === env) {
    dbConnectString = 'mongodb://localhost:27017/memcard'
  } else {
    dbConnectString = 'mongodb://khang:12332145@dogen.mongohq.com:10044/app31968851'
  }

  db = mongoskin.db(dbConnectString, {safe: true})
  console.log(env)
  req.collection = db.collection("Users")
  return next()
}

exports.createUser = function(req, res, next) {
  req.collection.insert(req.body, function(error, result) {
    if (error) {
      return next(e)
    }
    res.send(result)
  })
}

exports.listUsers = function(req, res, next){
  req.collection.find({}, {
    limit:10, sort: [['_id', -1]]}).toArray(function(e, results) {
      if(e) return next(e)
        res.send(results)
    })
}

exports.getUserByUserID = function(req, res, next){
  id = req.params.userID
  req.collection.findById(id, function(e, results) {
      if(e) return next(e)
        res.send(results)
    })
}

exports.db = function() {
  var env = process.env.NODE_ENV
  if("test" === env) {
    dbConnectString = 'mongodb://localhost:27017/memcard-test'
  } else if ("development" === env) {
    dbConnectString = 'mongodb://localhost:27017/memcard'
  } else {
    dbConnectString = 'mongodb://khang:12332145@dogen.mongohq.com:10044/app31968851'
  }

  db = mongoskin.db(dbConnectString, {safe: true})
  return db
}

exports.app = app
