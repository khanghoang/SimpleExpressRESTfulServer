var express = require('express');
var mongoskin = require('mongoskin')
var databaseModule = require('../databaseModule')

var app = express()

db = databaseModule.db()

exports.connectUser = function(req, res, next){
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

exports.getUserByUserID = _getUserByUserID

exports.deleteUserByUserID = function(req, res, next) {
  var userID = req.params.userID
  req.collection.remove({_id: userID}, function(e, r){
    if(e) {
      return res.send("Error when delete user")
    }

    res.send(200, [])
  })
}

exports.updateUserByUserID = function(req, res, next){
  // get user
  var userID = req.params.userID

  console.log(userID)

  req.collection.updateById(userID, {$set:req.body}, {safe: true, multi: false}, function(e, r) {

    if(e)
      return next(e)
    
    console.log("result = " + r)

    _getUser(req, next, function(results){
      console.log(results)
      res.send(results)
    })      

  })
}

// private functions
function _getUserByUserID(req, res, next){
  _getUser(req, next, function(results){
    res.send(results)
  })
}

function _getUser(req, next, cb){
  id = req.params.userID
  req.collection.findById(id, function(e, results) {
      if(e) return next(e)
      cb(results)
    })
}

exports.db = db
exports.app = app
