import { MyAPI } from '@/services/MyAPI';

const base = 'reviews/';

export const getAllReviews = async () => {
  return await (
    await MyAPI().get(`${base}`)
  ).data;
};
