var express = require('express')
var cors = require('cors')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
var app = express()
var server = require('http').Server(app)
var io = require('./services/socketio').init(server)

// attach socketio to every response
app.use((req, res, next) => {
  res.io = io
  next()
})

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())
app.use(cookieParser())

app.use('/api/faction', require('./routes/faction'))
app.use('/api/ship', require('./routes/ship'))
app.use('/api/building', require('./routes/building'))
app.use('/api/tower', require('./routes/tower'))
app.use('/api/relic', require('./routes/relic'))
app.use('/api/mission', require('./routes/mission'))
app.use('/api/referendum', require('./routes/referendum'))
app.use('/api/planet', require('./routes/planet'))
app.use('/api/sale', require('./routes/sale'))
app.use('/api/guild', require('./routes/guild'))
app.use('/api/skill', require('./routes/skill'))
app.use('/api/player', require('./routes/player'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 500
  next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => { // eslint-disable-line
    res.status(500).end()
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line
  res.status(500).end()
})

module.exports = { app: app, server: server, socketio: io }
