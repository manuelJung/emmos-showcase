/*
 * This server should act as a reverse-proxy to overcome the CORS-problem on the client
 */

var express = require('express')
var rp = require('request-promise')
var app = express()

var allowCrossDomain = () => function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Lang, Authorization')
    
  
  if ('OPTIONS' == req.method) { res.sendStatus(200) }
  else { next() }
}

app.use(allowCrossDomain())

app.get('/variants/:productNumber', function(req, res){
  var { productNumber } = req.params
  var link = 'http://vega-direct.com/widgets/Variants/?ordernumber='
  console.log('variants', link + productNumber) // eslint-disable-line
  
  var options = {
    method: 'GET',
    // auth: {
    //   'user': 'emmosbasic',
    //   'pass': 'Bernakirf3',
    //   'sendImmediately': false
    // },
    uri: link + productNumber,
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true // Automatically parses the JSON string in the response
  }
  
  rp(options)
    .then(data => res.send(data)) 
    .catch(err => res.status(500).send(err))
})

app.get('/container/:ordernumber', function(req, res){
  var { ordernumber } = req.params
  var link = 'http://vega-direct.com/widgets/Variants/container/ordernumber/'
  console.log('container', link + ordernumber) // eslint-disable-line

  var options = {
    method: 'GET',
    // auth: {
    //   'user': 'emmosbasic',
    //   'pass': 'Bernakirf3',
    //   'sendImmediately': false
    // },
    uri: link + ordernumber,
    headers: {
      'User-Agent': 'Request-Promise'
    }
  }
  
  rp(options)
    .then(data => res.send(data)) 
    .catch(err => res.status(500).send(err))
})

app.get('*', (req, res) => {
  res.send('Hello World')
})

app.listen(3001, () => {
  console.log('Example app listening on port http://localhost:3001!') // eslint-disable-line
})