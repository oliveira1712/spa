import { TypeRequest } from '@/models/api/TypeRequest';
import { API } from '@/services/API';

export function NifAPI(typeRequest: TypeRequest = TypeRequest.JSON) {
  const baseURL = `https://www.nif.pt/`;
  const API_NIF = `${process.env.API_NIF}`;

  return API(typeRequest, baseURL, {
    key: `${API_NIF}`,
  });
}
