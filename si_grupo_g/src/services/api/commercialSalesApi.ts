import { MyAPI } from '@/services/MyAPI';

const base = 'toconline/commercialSales/';

export const getSalesByCustomer = async (id: string) => {
  return await (
    await MyAPI().get(`${base}${id}`)
  ).data;
};
