import { NextApiRequest, NextApiResponse } from 'next';

import { verifyPassword } from '@/services/Bcrypt';
import { createToken } from '@/services/JWT';
import { prisma } from '@/services/prisma';

import { Method } from '@/models/api/Method';

import { validateEmail, validatePassword } from '@/utils/validations';

async function validate(email: string, password: string) {
  let errors: any = {};

  const erroEmail = await validateEmail(email);
  if (erroEmail) {
    errors.email = erroEmail;
  }
  const erroPassword = await validatePassword(password);
  if (erroPassword) {
    errors.password = erroPassword;
  }

  return errors;
}

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  if (method != Method.POST) {
    res.status(405).json({ error: `Method ${method} Not Allowed` });
    return;
  }

  try {
    const body = await req.body;

    const email = body.email;
    const password = body.password;

    //validate data
    let validations = await validate(email, password);

    if (Object.keys(validations).length >= 1) {
      res.status(400).json({ error: `Bad Request`, errors: validations });
    }

    const user = await prisma.users.findFirst({
      where: { email: email },
    });

    if (user == null) {
      res.status(200).json({ error: `User not exist` });
    }

    const passwordIsValid = await verifyPassword(password, user!.password);

    if (!passwordIsValid) {
      res.status(200).json({ error: `Invalid password` });
    }

    const token = createToken(user!.nif);

    user!.password = '';

    res.status(200).json({ token: token, user: user });
  } catch (e) {
    res.status(400).json({ error: `Bad Request` });
  }
}
