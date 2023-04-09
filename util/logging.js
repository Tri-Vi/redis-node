const winston = require('winston');
const  {format, transports} = require('winston');

// Middleware
const logger = winston.createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:MM:SS'
    }),
    format.json(),
    winston.format.colorize()
  ),
  defaultMeta: {
    service : 'http-requests',
  },
  transports: [
    new transports.File({
      filename: process.env.LOG_DIRECTORY + '/logs.log'
    }),
    new transports.Console()
  ]
})

module.exports = logger;