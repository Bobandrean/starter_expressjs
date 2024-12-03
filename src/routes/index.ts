import {Router} from 'express';
import partnerRouter from '../features/partner/partner.router';
import userRouter from '../features/users/user.router';
import {serviceMiddleware} from '../middleware/middleware';
import {authenticateToken} from '../middleware/jwt';
import authRouter from '../features/auth/auth.router';

const router = Router();

router.use('/access-token', partnerRouter);
router.use('/users', authenticateToken, userRouter);
router.use('/auth', authRouter);

export default router;
