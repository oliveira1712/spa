import { Customer } from '@/models/api/Customer';
import { TOConlineAPI } from '@/services/TOConlineAPI';

const customers = 'api/customers';
const sales = 'api/v1/commercial_sales_documents';

//? Commercial Sales endpoints

export const getAllSales = async () => {
  let result = await (await TOConlineAPI()).get(sales);
  return result.data;
};

export const checkCustomerDebts = async (id: string) => {
  const actualDate = new Date().toISOString().substring(0, 10);
  let result = await (
    await TOConlineAPI()
  ).get(
    `${sales}?filter="documents.customer_tax_registration_number=%27${id}%27 AND documents.date <= %27${actualDate}%27"`
  );
  let valid = true;

  for (let i = 0; i < result.data.length; i++) {
    if (result.data[i].pending_total > 0) {
      valid = false;
    }
  }

  return valid;
};

//? Customers endpoints

export const getAllCustomers = async () => {
  let result = await (await TOConlineAPI()).get(customers);
  return result.data;
};

export const addCustomer = async (customer: Customer) => {
  let result = await (
    await TOConlineAPI()
  ).post(customers, {
    data: {
      type: 'customers',
      attributes: customer,
    },
  });

  return result.data;
};

export const getCustomer = async (id: number) => {
  let result = await (await TOConlineAPI()).get(`${customers}/${id}`);

  return result.data;
};

export const deleteCustomer = async (id: number) => {
  let result = await (await TOConlineAPI()).delete(`${customers}/${id}`);

  return result.data;
};

export const updateCustomer = async (id: number, customer: Customer) => {
  let result = await (
    await TOConlineAPI()
  ).patch(`${customers}/${id}`, {
    data: {
      id: `${id}`,
      attributes: customer,
    },
  });

  return result.data;
};
