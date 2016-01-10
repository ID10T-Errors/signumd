const express = require('express')
const bodyParser = require('body-parser')
const Language = require('./language')
var app = express()

const errors = require('./errors')

var ExpressBrute = require('express-brute')
 
var store = new ExpressBrute.MemoryStore() 
var bruteforce = new ExpressBrute(store)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header("Content-Type", "text/text; charset=utf-8")
  next()
})

app.use(bodyParser.json())

app.post('/run/:language', bruteforce.prevent, function (req, res, next) {
  console.log(req.body)
  var language;
  try {
    language = require('./languages/' + req.params.language)
    //if (!(language instanceof Language)) throw language
  } catch (e) {
    return next(new errors[400]('signumd does not support language ' + req.params.language))
  }
  language.run(req.body.environment, req.body.code, res, next)
})

app.use(function (err, req, res, next) {
  if (!res.headersSent) {
    res.status(500)
  } else {
    res.send('\nINTERNAL SERVER ERROR:\n')
  }
  res.end(err.toString())
})

app.listen(8080)
