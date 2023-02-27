import bcrypt from 'bcrypt';

const salt: number = +process.env.SALT_ROUNDS!;

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}
