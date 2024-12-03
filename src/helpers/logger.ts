import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const fileTransport: DailyRotateFile = new DailyRotateFile({
  filename: './logs/' + process.env.APP_NAME + '-%DATE%.log',
  datePattern: 'DD-MM-YYYY',
  zippedArchive: true, // OPTIONAL. set the log file to gzip archived
  maxSize: '15m', // OPTIONAL. max size of the file (k, m, g for the suffix). (default: null)
  maxFiles: '14d', // REQUIRED. max number of logs to keep. This can be a number of files or number of days. If using days, add 'd' as the suffix. (default: null)
});

const logger = winston.createLogger({
  exitOnError: false,
  format: winston.format.combine(
    winston.format.timestamp({format: 'DD-MM-YYYY HH:mm:ss.SSS+07:00'}),
    winston.format.json(),
  ),
  defaultMeta: {},
  transports: [new winston.transports.Console({}), fileTransport],
});

export default logger;
