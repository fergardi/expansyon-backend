var express = require('express')
var cors = require('cors')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var app = express()
var server = require('http').Server(app)
var io = require('./services/socketio').init(server)

app.use((req, res, next) => {
  res.io = io
  next()
})

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/api/faction', require('./routes/faction'))
app.use('/api/ship', require('./routes/ship'))
app.use('/api/building', require('./routes/building'))
app.use('/api/tower', require('./routes/tower'))
app.use('/api/artifact', require('./routes/artifact'))
app.use('/api/mission', require('./routes/mission'))
app.use('/api/referendum', require('./routes/referendum'))
app.use('/api/planet', require('./routes/planet'))
app.use('/api/player', require('./routes/player'))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => { // eslint-disable-line
    res.status(404).end()
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line
  res.status(404).end()
})

module.exports = { app: app, server: server, socketio: io }
