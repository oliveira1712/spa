import { MyAPI } from "../MyAPI";

type updateData = {
  name: string;
  nif: string;
  cardNumber: string;
  expiryDateCard: string;
  cvc: string;
  plan: string;
  annual_billing: boolean;
};

type updateGeralData = {
    name: string;
    nif: string;
    numberPhone: string;
  };

export const getProfile = async () => {
  const response = await MyAPI()
    .get(`profile/getProfile`)

  console.log(response.data)
  return response.data;
};

export const updateGeralProfile = async (data: updateGeralData) => {
  const response = await MyAPI()
    .put(`profile/updateGeralProfile`, data)
    .catch((error: any) => {
      throw new Error(
        error.response?.data?.message ?? "Something went wrong while updating profile"
      );
    });
  return response.data;
};

export const updateProfile = async (data: updateData) => {
    const response = await MyAPI()
      .put(`profile/updateProfile`, data)
      .catch((error: any) => {
        throw new Error(
          error.response?.data?.message ?? "Something went wrong while updating profile"
        );
      });
    return response.data;
};