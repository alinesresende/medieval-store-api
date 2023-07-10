import { Request, Response } from 'express';
import loginService from '../service/login.service';
import { LoginPayload } from '../types/LoginPayload';

async function login(req: Request, res: Response):
Promise<Response<unknown, Record<string, unknown>> | undefined> {
  const payload = (req as Request & { user: LoginPayload }).user;
  const response = await loginService.login(payload);
  if (response) {
    return res.status(200).json({ token: response });
  } 
  return res.status(400).json({ message: 'token not created' });
}

export default {
  login,
};