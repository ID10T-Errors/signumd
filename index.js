const express = require('express')
const bodyParser = require('body-parser')
const Language = require('./language')
var app = express()

const errors = require('./errors')

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
})

app.use(bodyParser.json())

app.post('/run/:language', function (req, res, next) {
  var language;
  try {
    language = require('./languages/' + req.params.language)
    //if (!(language instanceof Language)) throw language
  } catch (e) {
    return next(new errors[400]('signumd does not support language ' + req.params.language))
  }
  console.log(req.body)
  language.run(req.body.environment, req.body.code, res)
})

app.listen(8080)
