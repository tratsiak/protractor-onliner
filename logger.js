const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: {type: 'console'},
    log: { type: 'file', filename: 'logs/log.log' },
  },
  categories: { 
    default: { appenders: ['log', 'console'], level: 'TRACE' } }
});

const logger = log4js.getLogger();

exports.logger = {
  trace: str => logger.trace(str),
  debug: str => logger.debug(str),
  info: str => logger.info(str),
  warn: str => logger.warn(str),
  error: str => logger.error(str),
  fatal: str => logger.fatal(str)
}