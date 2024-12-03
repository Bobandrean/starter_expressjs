import {Request, Response} from 'express';
import * as Joi from 'joi';
import {CustomException} from '../../exceptions/CustomException';
import {EXCEPTION_MESSAGE} from '../../exceptions/EXCEPTION_MESSAGE';
import {getAccessKey} from './partner.service';
import {responseJSON} from '../../helpers/response-handler';

export const authenticate = async (req: Request, res: Response) => {
  try {
    const schema = Joi.object().keys({
      type: Joi.string().valid('GRANT_ACCESS_KEY').required(),
      key: Joi.string().required(),
    });
    const validation = schema.validate(req.body, {
      allowUnknown: true,
    });
    if (!validation.error) {
      const accessKey = await getAccessKey(req.body);
      return responseJSON(req, res, {data: accessKey});
    } else {
      throw new CustomException(
        EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA,
        validation.error,
      );
    }
  } catch (error) {
    return responseJSON(req, res, error, true);
  }
};
