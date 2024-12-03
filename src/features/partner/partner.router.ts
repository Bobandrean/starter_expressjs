import {Router} from 'express';
import {authenticate} from './partner.controller';

const partnerRouter = Router();

partnerRouter.post('/', authenticate);

export default partnerRouter;
