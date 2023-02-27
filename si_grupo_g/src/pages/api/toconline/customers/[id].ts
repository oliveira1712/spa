import { Customer } from '@/models/api/Customer';
import { Method } from '@/models/api/Method';
import {
  checkCustomerDebts,
  deleteCustomer,
  getCustomer,
  updateCustomer,
} from '@/services/api/TocOnlineApi';
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
      await getClient(idNumber, res);
      break;
    case Method.DELETE:
      await deleteClient(idNumber, res);
      break;
    case Method.PATCH:
      await updateClient(idNumber, res, req);
      break;
    default:
      return res.status(405).json({ error: `Method ${method} Not Allowed` });
  }
}

//? Client endpoints

async function getClient(id: number, res: NextApiResponse) {
  let result;
  try {
    result = await getCustomer(id);
  } catch (error) {
    result = { error: true };
  }
  return res.status(200).send(JSON.stringify(result, null, 2));
}

async function deleteClient(id: number, res: NextApiResponse) {
  let result;
  try {
    result = await deleteCustomer(id);
  } catch (error) {
    result = { error: true };
  }
  return res.status(200).send(JSON.stringify(result, null, 2));
}

async function updateClient(
  id: number,
  res: NextApiResponse,
  req: NextApiRequest
) {
  let customer: Customer = req.body;
  let result;
  try {
    result = await updateCustomer(id, customer);
  } catch (error: any) {
    console.log(error.message);
    result = { error: true };
  }
  return res.status(200).send(JSON.stringify(result, null, 2));
}
