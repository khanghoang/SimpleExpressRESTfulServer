var superagent = require("superagent")
var expect = require("expect.js")

describe('express test api server', function(done){
    superagent.post('http://localhost:3000/collections/test')
        .send({
            name: "John",
            email: "Khang@gmail.com"
        })
        .end(function(e, res){
            expect(e).to.eql(null)
            done()
        })
})
