import { Customer } from '@/models/api/Customer';
import { Method } from '@/models/api/Method';
import { getAllCustomers, addCustomer, getAllSales } from '@/services/api/TocOnlineApi';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function Customers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  switch (method) {
    case Method.GET:
      await getAll(res);
      break;
    case Method.POST:
      await add(req, res);
      break;
    default:
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}

async function getAll(res: NextApiResponse) {
  let result;
  try {
    result = await getAllCustomers();
  } catch (error) {
    result = { error: true };
  }
  return res.status(200).send(JSON.stringify(result, null, 2));
}

async function add(req: NextApiRequest, res: NextApiResponse) {
  let customer: Customer = req.body;
  let result;
  try {
    result = await addCustomer(customer);
  } catch (error) {
    result = { error: true };
  }
  return res.status(200).send(JSON.stringify(result, null, 2));
}
