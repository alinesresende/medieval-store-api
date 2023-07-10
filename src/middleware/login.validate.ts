import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import UserModel from '../database/models/user.model';
import { LoginPayload } from '../types/LoginPayload';

export async function doesPasswordAndUsernameExists(
  req: Request, 
  res: Response, 
  next: NextFunction,
): 
  Promise<Response<unknown, Record<string, unknown>> | undefined> {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: '"username" and "password" are required' });
  } 
  next();
}

export async function arePasswordAndUsernameValid(req: Request, res: Response, next: NextFunction): 
Promise<Response<unknown, Record<string, unknown>> | undefined> {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ where: { username } });

  if (!user || !bcrypt.compareSync(password, user.dataValues.password)) {
    return res.status(401).json({ message: 'Username or password invalid' });
  }

  (req as Request & 
  { user: LoginPayload }).user = { id: user.dataValues.id, username: user.dataValues.username };
  next();
} 
