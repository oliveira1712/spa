import { verifyNif } from '@/services/api/NifAPI';
import { z, ZodError, ZodType } from 'zod';

async function validate<T extends ZodType>(
  value: any,
  validation: T
): Promise<undefined | string[]> {
  try {
    await validation.parseAsync(value);
    return undefined;
  } catch (error) {
    if (error instanceof ZodError) {
      return error.flatten().formErrors;
    } else if (error instanceof Error) {
      return [`${error.message}`];
    }
  }
}

export async function validateNif(nif: string): Promise<undefined | string[]> {
  const nifValidation = z
    .string()
    .refine((val) => Number(val) && val.length == 9, {
      message: 'NIF não possui 9 dígitos',
    });

  let isValid = await validate(nif, nifValidation);

  if (isValid) {
    return isValid;
  }

  /*if (!(await verifyNif(nif))) {
    return ['NIF não pertence a uma empresa'];
  }*/

  return undefined;
}

export async function validateEmail(
  email: string
): Promise<undefined | string[]> {
  const emailValidation = z.string().email({ message: 'O email é inválido' });

  return await validate(email, emailValidation);
}

export async function validateName(
  name: string
): Promise<undefined | string[]> {
  const nameValidation = z.string().min(1, { message: 'O nome é inválido' });

  return await validate(name, nameValidation);
}

function getRegexPassword(
  numberLowerCases: number = 1,
  numberUpperCases: number = 1,
  numberNumbers: number = 1,
  numberSpecialCharacters: number = 1,
  sizePassword: number = 8
): RegExp {
  return new RegExp(
    `^(?=(.*[a-z]){${numberLowerCases},})(?=(.*[A-Z]){${numberUpperCases},})(?=(.*[0-9]){${numberNumbers},})(?=(.*[!@#$%^&*()\-__+.]){${numberSpecialCharacters},}).{${sizePassword},}$`
  );
}

export async function validatePassword(
  password: string
): Promise<undefined | string[]> {
  const passwordValidation = z.string().regex(getRegexPassword(), {
    message: 'Password fraca',
  });

  return await validate(password, passwordValidation);
}

export async function validateNumberPhone(
  numberPhone: string
): Promise<undefined | string[]> {
  const numberPhoneRegex = /^9[1 2 3 6][1-9]{7}$/;
  const numberPhoneValidation = z.string().regex(numberPhoneRegex, {
    message: 'Numero de telemóvel inválida',
  });

  return await validate(numberPhone, numberPhoneValidation);
}

export async function validateCardNumber(
  cardNumber: string
): Promise<undefined | string[]> {
  const cardNumberValidation = z
    .string()
    .refine((val) => Number(val) && val.length == 16, {
      message: 'Número do cartão de crédito não possui 16 dígitos',
    });

  return await validate(cardNumber, cardNumberValidation);
}

export async function validateCVC(cvc: string): Promise<undefined | string[]> {
  const cvcValidation = z
    .string()
    .refine((val) => Number(val) && val.length == 3, {
      message: 'CVC não possui 3 digitos',
    });

  return await validate(cvc, cvcValidation);
}

export async function validateExpiryDateCard(
  expiryDate: string
): Promise<undefined | string[]> {
  const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
  const expiryDateValidation = z.string().regex(expiryDateRegex, {
    message: 'Data de expiração inválida',
  });

  return await validate(expiryDate, expiryDateValidation);
}
