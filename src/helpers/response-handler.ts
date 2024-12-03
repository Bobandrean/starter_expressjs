import {LEVEL, EXCEPTION_MESSAGE} from '../exceptions/EXCEPTION_MESSAGE';
import {Request, Response} from 'express';
import logger from './logger';
import {serializeError} from 'serialize-error';

export const responseJSON = (
  req: Request,
  res: Response,
  responseHandler: any,
  isFailed: boolean = false,
) => {
  if (isFailed) {
    let statusCode: number = 500;
    let level: string = LEVEL.ERROR;
    const shortMessage: string = responseHandler.obj
      ? responseHandler.obj.message
      : 'UNIDENTIFIED_ERROR';
    if (responseHandler.obj) {
      statusCode = responseHandler.obj.code;
      level = responseHandler.obj.level;
      res.status(responseHandler.obj.code).json({
        status: 'FAILED',
        message: responseHandler.obj.message,
        traceId: req.body.traceId,
        data: responseHandler.systemLog,
      });
    } else {
      res.status(500).json({
        status: 'FAILED',
        message: EXCEPTION_MESSAGE.PROCESSING_ERROR.message,
        traceId: req.body.traceId,
        data: responseHandler.systemLog,
      });
    }
    logger.log(level, shortMessage, {
      traceId: req.body.traceId,
      statusCode: statusCode,
      message: responseHandler.obj
        ? JSON.stringify(responseHandler.systemLog)
        : JSON.stringify(serializeError(responseHandler)),
    });
  } else {
    res
      .status(200)
      .json({status: 'SUCCESS', message: 'SUCCESS', ...responseHandler});
    logger.log(LEVEL.INFO, 'SUCCESS', {
      traceId: req.body.traceId,
      statusCode: 200,
      message: responseHandler,
    });
  }
};
