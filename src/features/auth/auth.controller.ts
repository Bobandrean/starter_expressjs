import {Request, Response} from 'express';
import {getAllUsersSvc} from './auth.service';
import {responseJSON} from '../../helpers/response-handler';
import {CustomException} from '../../exceptions/CustomException';
import {EXCEPTION_MESSAGE} from '../../exceptions/EXCEPTION_MESSAGE';
import {loginSchema, registerSchema} from './auth.validation';
import {createUserSvc} from '../users/user.service';
import {getUserByEmailRpo} from '../users/user.repository';
import {verifyPassword} from '../../helpers/tools';
import {userRes} from '../users/user.dto';
const {JWT_SECRET, JWT_EXPIRES_IN, REFRESH_JWT_SECRET, REFRESH_JWT_EXPIRES_IN} =
  process.env;
const jwt = require('jsonwebtoken');

export const register = async (req: Request, res: Response) => {
  try {
    const validation = registerSchema.validate(req.body, {
      allowUnknown: true,
    });

    if (validation.error) {
      throw new CustomException(
        EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA,
        validation.error,
      );
    }

    if (await getUserByEmailRpo(validation.value.email)) {
      throw new CustomException(EXCEPTION_MESSAGE.EMAIL_ALREADY_EXISTS);
    }

    const user = await createUserSvc(req.body);
    return responseJSON(req, res, {data: userRes(user)});
  } catch (error) {
    return responseJSON(req, res, error, true);
  }
};

export const login = async (req: Request, res: Response) => {
  const validation = loginSchema.validate(req.body, {
    allowUnknown: true,
  });

  if (validation.error) {
    throw new CustomException(
      EXCEPTION_MESSAGE.MISSING_REQUIRED_DATA,
      validation.error,
    );
  }

  try {
    const user = await getUserByEmailRpo(validation.value.email);
    if (!user) {
      throw new CustomException(EXCEPTION_MESSAGE.USER_NOT_FOUND);
    }

    const isPasswordValid = verifyPassword(
      validation.value.password,
      user.password,
      validation.value.email,
    );
    if (!isPasswordValid) {
      throw new CustomException(EXCEPTION_MESSAGE.NOT_AUTHORIZED);
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      JWT_SECRET,
      {expiresIn: JWT_EXPIRES_IN},
    );

    const refreshToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      REFRESH_JWT_SECRET,
      {expiresIn: REFRESH_JWT_EXPIRES_IN},
    );

    return responseJSON(req, res, {token, refreshToken});
  } catch (error) {
    return responseJSON(req, res, error, true);
  }
};

export const profile = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await getUserByEmailRpo(decoded.email);
    return responseJSON(req, res, {data: userRes(user)});
  } catch (error) {
    return res.status(401).json({status: 'FAILED', message: 'Unauthorized'});
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, REFRESH_JWT_SECRET);
    const token = jwt.sign(
      {
        userId: decoded.userId,
        email: decoded.email,
      },
      JWT_SECRET,
      {expiresIn: JWT_EXPIRES_IN},
    );
    return responseJSON(req, res, {token});
  } catch (error) {
    return responseJSON(req, res, error, true);
  }
};
