/* istanbul ignore file */

import winston from 'winston';

function addConsole (logger) {
  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple()
    }));
  }
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info'
});

addConsole(logger);

export default logger;
