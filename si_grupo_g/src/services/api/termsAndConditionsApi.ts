import { MyAPI } from '@/services/MyAPI';

const base = 'termsandconditions/';

export const getAllTermsAndConditions = async () => {
  return await (
    await MyAPI().get(`${base}`)
  ).data;
};
