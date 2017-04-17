var fs = require('fs')
var winston = require('winston')
winston.transports.Mysql = require('winston-mysql')
require('winston-daily-rotate-file')

if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs')
}

const logger = new winston.Logger({
  transports: [
    new winston.transports.Mysql({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      table: 'log'
    }),
    new winston.transports.DailyRotateFile({
      level: 'error',
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
