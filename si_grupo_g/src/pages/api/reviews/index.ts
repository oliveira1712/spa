import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/services/prisma';

import { Method } from '@/models/api/Method';

export default async function getAllReviews(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method != Method.GET) {
    return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }

  const reviews = await prisma.reviews.findMany();
  return res.status(200).json(reviews);
}
