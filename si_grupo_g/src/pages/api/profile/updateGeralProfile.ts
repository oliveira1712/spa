import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/services/prisma';

import { Method } from '@/models/api/Method';

import { updateCustomer } from '@/services/api/TocOnlineApi';

import { validateName, validateNumberPhone } from '@/utils/validations';

async function validate(name: string, numberPhone: string) {
  let errors: any = {};

  const erroName = await validateName(name);
  if (erroName) {
    errors.name = erroName;
  }
  const erroNumberPhone = await validateNumberPhone(numberPhone);
  if (erroNumberPhone) {
    errors.numberPhone = erroNumberPhone;
  }

  console.log(errors.length);

  return errors;
}

export default async function updateGeralProfile(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method != Method.PUT) {
    res.status(405).json({ error: `Method ${method} Not Allowed` });
    return;
  }

  try {
    const body = await req.body;

    const nif = body.nif;
    const name = body.name;
    const numberPhone = body.numberPhone;

    let validations = await validate(name, numberPhone);

    if (Object.keys(validations).length >= 1) {
      res.status(400).json({ error: `Bad Request`, errors: validations });
    }

    const user = await prisma.users.update({
      where: {
        nif: nif,
      },
      data: {
        name: name,
        numberPhone: Number(numberPhone),
      },
    });

    await updateCustomer(Number(user.idTOConline), {
      business_name: name,
      mobile_number: numberPhone,
    });

    res.status(200).json({ user: user });
  } catch (e) {
    res.status(400).json({ error: 'Bad Request' });
  }
}
