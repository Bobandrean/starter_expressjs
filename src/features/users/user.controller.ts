import {Request, Response} from 'express';
import * as Joi from 'joi';
import {
  getAllUsersSvc,
  getUserByIdSvc,
  createUserSvc,
  updateUserSvc,
  deleteUserSvc,
} from './user.service';
import {responseJSON} from '../../helpers/response-handler';
import {CustomException} from '../../exceptions/CustomException';
import {EXCEPTION_MESSAGE} from '../../exceptions/EXCEPTION_MESSAGE';
import {userSchema, userUpdateSchema} from './user.validation';
import {userRes} from './user.dto';

export const index = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersSvc();
    return responseJSON(req, res, {data: users.map((user) => userRes(user))});
  } catch (err) {
    return responseJSON(req, res, {message: err.message}, true);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdSvc(req.params.id);
    if (user) {
      return responseJSON(req, res, {data: userRes(user)});
    } else {
      throw new CustomException(EXCEPTION_MESSAGE);
    }
  } catch (error) {
    return responseJSON(req, res, error, true);
  }
};

export const store = async (req: Request, res: Response) => {
  try {
    const validation = userUpdateSchema.validate(req.body, {
      allowUnknown: true,
    });
    if (!validation.error) {
      const user = await createUserSvc(req.body);
      return responseJSON(req, res, {data: userRes(user)});
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

export const update = async (req: Request, res: Response) => {
  try {
    const validation = userUpdateSchema.validate(req.body, {
      allowUnknown: true,
    });
    if (!validation.error) {
      const user = await updateUserSvc(req.params.id, req.body);
      return responseJSON(req, res, {data: userRes(user)});
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

export const destroy = async (req: Request, res: Response) => {
  try {
    const user = await deleteUserSvc(req.params.id);

    if (!user) {
      throw new CustomException(EXCEPTION_MESSAGE.USER_NOT_FOUND);
    }

    return responseJSON(req, res, {data: userRes(user)});
  } catch (error) {
    return responseJSON(req, res, error, true);
  }
};
