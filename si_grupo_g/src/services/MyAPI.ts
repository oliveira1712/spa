import { TypeRequest } from '@/models/api/TypeRequest';
import { API } from '@/services/API';
import { parseCookies } from 'nookies';

export function MyAPI(typeRequest: TypeRequest = TypeRequest.JSON) {
  const baseURL = `${process.env.NEXT_PUBLIC_API_URL}api/`;

  //let tokenData = sessionStorage.getItem('token');
  const { authentication: tokenData } = parseCookies();

  let token: string | undefined = undefined;
  if (tokenData) {
    token = `Bearer ${tokenData}`;
  }

  return API(typeRequest, baseURL, null, token);
}
