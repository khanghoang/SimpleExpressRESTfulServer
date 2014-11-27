var express = require('express');
var mongoskin = require('mongoskin')

var app = express()

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

function getUserByUserID(req, res, next){
  id = req.params.userID
  req.collection.findById(id, function(e, results) {
      if(e) return next(e)
        res.send(results)
    })
}

exports.getUserByUserID = getUserByUserID

exports.updateUserByUserID = function(req, res, next){
  // get user
  getUser(req, next, function(user){
    // update
    req.collection.update({_id:user._id}, {$set:req.body}, function(e, results) {
      if(e)
        return next(e)
        
      getUserByUserID(req, res, next)      
    })
  })
}

// private functions
function _getUser(req, next, cb){
  id = req.params.userID
  req.collection.findById(id, function(e, results) {
      if(e) return next(e)
      cb(results)
    })
}

exports.db = db
exports.app = app
