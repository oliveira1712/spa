import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/services/prisma';

import { Method } from '@/models/api/Method';

export default async function getAllTermsAndConditions(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method != Method.GET) {
    res.status(405).json({ error: `Method ${method} Not Allowed` });
    return;
  }

  const termsAndConditions = await prisma.termsAndConditions.findMany();

  return res.status(200).json(termsAndConditions);
}
