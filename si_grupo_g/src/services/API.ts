import axios from 'axios';
import { TypeRequest } from '@/models/api/TypeRequest';

export function configuration(
  typeRequest: TypeRequest = TypeRequest.JSON,
  authorizationHeader?: string
): {} {
  let config: any = {};

  config['Access-Control-Allow-Origin'] = '*';
  if (typeRequest == TypeRequest.FORM) {
    config['Content-type'] = 'multipart/form-data';
  } else {
    config['Content-type'] = 'application/json';
  }

  if (authorizationHeader) {
    config.Authorization = authorizationHeader;
  }
  return config;
}

export function API(
  typeRequest: TypeRequest = TypeRequest.JSON,
  baseURL: string,
  params?: any,
  authorizationHeader?: string
) {
  return axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: configuration(typeRequest, authorizationHeader),
    params: params,
  });
}
