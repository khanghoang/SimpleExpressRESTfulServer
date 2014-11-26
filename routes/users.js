var express = require('express');
var app = express();
var mongoskin = require('mongoskin')

var dbConnectString = app.get('env') === 'development' ? 'mongodb://localhost:27017/test' : "mongodb://khang:12332145@dogen.mongohq.com:10044/app31968851"
var db = mongoskin.db(dbConnectString, {safe: true})

exports.connectUser = function(req, res, next){
  req.collection = db.collection("Users")
  console.log(req.collection)
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
      console.log(results)
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
