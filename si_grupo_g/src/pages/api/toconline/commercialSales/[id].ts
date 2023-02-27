import { Method } from '@/models/api/Method';
import { checkCustomerDebts } from '@/services/api/TocOnlineApi';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function CustomersID(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  const { id } = req.query;
  let idNumber;

  try {
    idNumber = Number(id);
  } catch (error) {
    return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }

  switch (method) {
    case Method.GET:
      await getSale(idNumber, res);
      break;
    default:
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}

//? Sales endpoints

async function getSale(id: number, res: NextApiResponse) {
  let result;
  try {
    result = await checkCustomerDebts(id.toString());
  } catch (error) {
    result = { error: true };
  }
  return res.status(200).send(JSON.stringify(result, null, 2));
}
