import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/services/prisma';

import { Method } from '@/models/api/Method';
import { ProfileData } from '@/components/Profile';
import { getNIFToken } from '@/services/JWT';

export default async function getProfile(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;

  if (method != Method.GET) {
    res.status(405).json({ error: `Method ${method} Not Allowed` });
    return;
  }

  try {
    let nif: any = getNIFToken(req.headers.authorization!);

    if (nif == null) {
      res.status(405).json({ error: `Not Allowed` });
    }

    const user = await prisma.users.findFirst({
        where: { nif: nif.NIF },
    });

    if (user == null) {
        res.status(405).json({ error: `User not exist` });
    }

    const data: ProfileData = {
      name: user!.name,
      nif: user!.nif,
      email: user!.email,
      phoneNumber: user!.numberPhone.toString(),
      imageUrl: user!.avatar || "",
    }

    res.status(200).json({ data: data });
  } catch (e) {
    res.status(400).json({ error: `Bad Request` });
  }

}