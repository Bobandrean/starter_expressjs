import {Router} from 'express';
import {register, login, profile, refreshToken} from './auth.controller';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/profile', profile);
authRouter.get('/refresh-token', refreshToken);

export default authRouter;
