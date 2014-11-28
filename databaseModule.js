var express = require('express');
var mongoskin = require('mongoskin')

var app = express()

var env = app.get("env")
if("test" === env) {
  dbConnectString = 'mongodb://localhost:27017/memcard-test'
} else if ("development" === env) {
  dbConnectString = 'mongodb://localhost:27017/memcard'
} else {
  dbConnectString = 'mongodb://khang:12332145@dogen.mongohq.com:10044/app31968851'
}

exports.db = function(){
  db = mongoskin.db(dbConnectString, {safe: true})
  return db
}
