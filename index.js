const express = require('express')
const bodyParser = require('body-parser')
const Language = require('./language')
var app = express()

const errors = require('./errors')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.json())

app.post('/run/:language', function (req, res, next) {
  res.streamed = true
  var language
  try {
    language = require('./languages/' + req.params.language)
    //if (!(language instanceof Language)) throw language
  } catch (e) {
    return next(new errors[400]('signumd does not support language ' + req.params.language))
  }
  language.run(req.body.environment, req.body.code, res, next)
})

app.use(function (err, req, res, next) {
  if (res.streamed) {
    if (!res.headersSent) {
      res.status(500)
    } else {
      res.send('\nINTERNAL SERVER ERROR:\n')
    }
    res.end(err.toString())
  } else {
    if (!res.headersSent) {
      res.status(500)
    }
    res.end(JSON.stringify({
      status: 'fail',
      data: {
        error: err.toString()
      }
    }))
  }
})

app.listen(8080)
