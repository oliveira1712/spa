import { NextApiRequest, NextApiResponse } from 'next';

import { hashPassword } from '@/services/Bcrypt';
import { createToken } from '@/services/JWT';
import { prisma } from '@/services/prisma';

import { Method } from '@/models/api/Method';

import {
  validateCVC,
  validateCardNumber,
  validateEmail,
  validateExpiryDateCard,
  validateName,
  validateNif,
  validateNumberPhone,
  validatePassword,
} from '@/utils/validations';
import { addCustomer } from '@/services/api/TocOnlineApi';

async function validate(
  nif: string,
  email: string,
  name: string,
  password: string,
  numberPhone: string,
  cardNumber: string,
  expiryDateCard: string,
  cvc: string
) {
  let errors: any = {};

  const erroNif = await validateNif(nif);
  if (erroNif) {
    errors.nif = erroNif;
  }
  const erroEmail = await validateEmail(email);
  if (erroEmail) {
    errors.email = erroEmail;
  }
  const erroName = await validateName(name);
  if (erroName) {
    errors.name = erroName;
  }
  const erroPassword = await validatePassword(password);
  if (erroPassword) {
    errors.password = erroPassword;
  }
  const erroNumberPhone = await validateNumberPhone(numberPhone);
  if (erroNumberPhone) {
    errors.numberPhone = erroNumberPhone;
  }
  const erroCardNumber = await validateCardNumber(cardNumber);
  if (erroCardNumber) {
    errors.cardNumber = erroCardNumber;
  }
  const erroExpiryDateCard = await validateExpiryDateCard(expiryDateCard);
  if (erroExpiryDateCard) {
    errors.expiryDateCard = erroExpiryDateCard;
  }
  const erroCVC = await validateCVC(cvc);
  if (erroCVC) {
    errors.cvc = erroCVC;
  }

  return errors;
}

export default async function regist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method != Method.POST) {
    res.status(405).json({ error: `Method ${method} Not Allowed` });
    return;
  }

  try {
    const body = await req.body;

    const nif = body.nif;
    const email = body.email;
    const name = body.name;
    const password = body.password;
    const numberPhone = body.numberPhone;
    const cardNumber = body.cardNumber;
    const expiryDateCard = body.expiryDateCard;
    const cvc = body.cvc;
    const plan = body.plan;
    const isAnual = Boolean(body.annual_billing);

    let validations = await validate(
      nif,
      email,
      name,
      password,
      numberPhone,
      cardNumber,
      expiryDateCard,
      cvc
    );

    if (Object.keys(validations).length >= 1) {
      res.status(400).json({ error: `Bad Request`, errors: validations });
    }

    let result = await addCustomer({
      tax_registration_number: `${nif}`,
      business_name: `${name}`,
      mobile_number: `${numberPhone}`,
      email: `${email}`,
    });

    const user = await prisma.users.create({
      data: {
        nif: nif,
        email: email,
        name: name,
        password: await hashPassword(password),
        numberPhone: Number(numberPhone),
        plan: plan,
        isAnual: isAnual,
        idTOConline: result.data.id,
      },
    });

    const token = createToken(user!.nif);

    user.password = '';

    res.status(200).json({ token: token, user: user });
  } catch (e: any) {
    console.log(e.message);
    res.status(400).json({ error: `Bad Request` });
  }
}
