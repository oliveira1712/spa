import jwt from 'jsonwebtoken';

const expiresIn: string = '15 days';
const JWT_KEY: string = process.env.JWT_KEY!;

export function createToken(nif: string) {
  return jwt.sign({ NIF: nif }, JWT_KEY, {
    expiresIn: expiresIn,
  });
}

export function getNIFToken(token: string) {
  if (token) {
    token = token.split('Bearer ', 2)[1];
    try {
      return jwt.verify(token, JWT_KEY);
    } catch (error) {}
  }
  return null;
}