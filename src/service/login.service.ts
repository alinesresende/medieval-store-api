import { LoginPayload } from '../types/LoginPayload';
import { generateToken } from '../utils/jwt';

async function login(payload: LoginPayload): Promise<string> {
  const token = generateToken(payload);
  return token;
}

export default {
  login,
};