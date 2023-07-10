import { Router } from 'express';
import loginController from '../controller/login.controller';
import {
  arePasswordAndUsernameValid,
  doesPasswordAndUsernameExists,
} from '../middleware/login.validate';

const loginRouter = Router();

loginRouter.post(
  '/login', 
  doesPasswordAndUsernameExists,
  arePasswordAndUsernameValid, 
  loginController.login,
);

export default loginRouter;