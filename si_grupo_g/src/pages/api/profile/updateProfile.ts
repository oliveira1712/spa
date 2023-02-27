import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/services/prisma';

import { Method } from '@/models/api/Method';

import {
    validateCVC,
    validateCardNumber,
    validateExpiryDateCard,
    validateName,
    validateNif,
} from "@/utils/validations";
  
async function validate(
    nif: string,
    name: string,
    cardNumber: string,
    expiryDateCard: string,
    cvc: string
  ) {
    let errors = [];
  
    const erroNif = await validateNif(nif);
    if (erroNif) {
      errors.push({ nif: erroNif });
    }
    const erroName = await validateName(name);
    if (erroName) {
      errors.push({ name: erroName });
    }
    const erroCardNumber = await validateCardNumber(cardNumber);
    if (erroCardNumber) {
      errors.push({ cardNumber: erroCardNumber });
    }
    const erroExpiryDateCard = await validateExpiryDateCard(expiryDateCard);
    if (erroExpiryDateCard) {
      errors.push({ expiryDateCard: erroExpiryDateCard });
    }
    const erroCVC = await validateCVC(cvc);
    if (erroCVC) {
      errors.push({ cvc: erroCVC });
    }
  
    return errors;
  }

export default async function updateProfile(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  if (method != Method.PUT) {
    res.status(405).json({ error: `Method ${method} Not Allowed` });
    return;
  }

  try {
    const body = await req.body;

    const nif = body.nif;
    const name = body.name;
    const expiryDateCard = body.expiryDateCard;
    const cvc = body.cvc;
    const plan = body.plan;
    const annual_billing = body.annual_billing;
    const cardNumber = body.cardNumber;

    let validations = await validate(
        nif,
        name,
        cardNumber,
        expiryDateCard,
        cvc,
    );

    if (validations.length >= 1) {
        res.status(400).json({ error: `Bad Request`, errors: validations });
    }

    const user = await prisma.users.update({
        where: {
            nif: nif
        },
        data: {
            name: name,
            plan: plan,
            carNumber : cardNumber,
            expiryDateCard: expiryDateCard,
            annual_billing: annual_billing,
            cvc: cvc
          }
    });

    res.status(200).json({user: user});
  } catch (e) {
    res.status(400).json({ error: `Bad Request` });
  }

}