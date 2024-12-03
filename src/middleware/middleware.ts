import {Request, Response, NextFunction} from 'express';
import {verifyToken} from './jwt';
import {responseJSON} from '../helpers/response-handler';
import {LEVEL, EXCEPTION_MESSAGE} from '../exceptions/EXCEPTION_MESSAGE';
import logger from '../helpers/logger';
import {v4 as uuidv4} from 'uuid';
import {CustomException} from '../exceptions/CustomException';
import {getPartner} from '../features/partner/partner.repository';
import {base64Decode} from '../helpers/tools';
import {PartnerAttributes} from '../db/models/Partner';

export async function serviceMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const traceId: string = uuidv4();
  if (!req.body.traceId) req.body.traceId = traceId;
  const message: string = JSON.stringify({
    headers: req.headers,
    body: req.body,
  });
  logger.log(LEVEL.INFO, 'REQUEST_DATA', {
    traceId: traceId,
    statusCode: null,
    message: message,
  });
  checkAuthentication(req, res, next);
}

async function checkAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const apiKey = req.headers['x-api-key'];
    if (apiKey !== undefined && apiKey !== '') {
      const decodedKey = base64Decode(apiKey.toString());
      const decodedKeyObject = decodedKey.split(':');
      const verifyKey: PartnerAttributes = await getPartner({
        clientId: decodedKeyObject[0],
        clientSecret: decodedKeyObject[1],
      });
      if (!verifyKey) {
        throw new CustomException(EXCEPTION_MESSAGE.NOT_AUTHORIZED, {
          message: 'Invalid api key',
        });
      }
      // req.body.partnerId = verifyKey.id;
      next();
    } else {
      throw new CustomException(EXCEPTION_MESSAGE.NOT_AUTHORIZED, {
        message: 'Invalid api key',
      });
    }
  } catch (e) {
    if (e instanceof CustomException) {
      if (e.obj.code >= 500) {
        logger.log(LEVEL.ERROR, '[ERROR]', {
          traceId: req.body.traceId,
          statusCode: null,
          message: e,
        });
      }
    } else {
      logger.log(LEVEL.ERROR, '[ERROR]', {
        traceId: req.body.traceId,
        statusCode: null,
        message: e,
      });
    }
    responseJSON(req, res, e, true);
  }
}
