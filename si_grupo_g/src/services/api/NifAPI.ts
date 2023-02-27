import { NifAPI } from '@/services/NifAPI';

export const verifyNif = async (nif: string) => {
  let result = await NifAPI().get(`?json=1&q=${nif}`);
  return result.data.result != 'error';
};
