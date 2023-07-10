import jwt from 'jsonwebtoken';
import { LoginPayload } from '../types/LoginPayload';

const secret = process.env.JWT_SECRET || 'secret';

export function generateToken(payload: LoginPayload): string {
  // 1 - jwt.sign recebe o payload e secrect como parametros
  // 2 - retorna uma string
  const token = jwt.sign(payload, secret);
  return token;
}

export function verify(token: string): LoginPayload { 
  const data = jwt.verify(token, secret) as LoginPayload; 
  return data; 
}
