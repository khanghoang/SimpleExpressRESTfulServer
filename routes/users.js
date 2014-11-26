var express = require('express');
var app = express();
var mongoskin = require('mongoskin')

var dbConnectString = app.get('env') === 'development' ? 'mongodb://localhost:27017/test' : "mongodb://<user>:<password>@dogen.mongohq.com:10044/app31968851"
var db = mongoskin.db(dbConnectString, {safe: true})

exports.connectUser = function(req, res, next){
    req.collection = db.collection("User")
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
