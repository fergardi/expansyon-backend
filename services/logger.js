var fs = require('fs')
var winston = require('winston')
require('winston-daily-rotate-file')

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs')
}

const logger = new winston.Logger({
  transports: [
    new winston.transports.DailyRotateFile({
      level: process.env.ENV === 'development' ? 'debug' : 'info',
      filename: `logs/.log.txt`,
      datePattern: 'dd-MM-yyyy',
      prepend: true,
      localTime: true,
      maxsize: 10485760,
      maxFiles: 10,
      colorize: true
    }),
    new winston.transports.Http(),
    new winston.transports.Console({
      silent: true
    })
  ],
  exitOnError: false
})

module.exports = logger
