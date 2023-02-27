import { TypeRequest } from '@/models/api/TypeRequest';
import { API } from '@/services/API';

let baseURL = `${process.env.TOCOnline_URL}`;

export async function TOConlineAPI(
  typeRequest: TypeRequest = TypeRequest.JSON
) {
  let oauth = await get_new_oauth_token();
  const token = `Bearer ${oauth.access_token}`;

  return API(typeRequest, baseURL, null, token);
}

export function TOConlineAPINoAuthorization(
  typeRequest: TypeRequest = TypeRequest.JSON
) {
  return API(typeRequest, baseURL);
}

export function TOConlineToken() {
  const token = `Basic ${process.env.TOCOnline_KEY_BASE64}`;

  return API(TypeRequest.URLENCODED, baseURL, null, token);
}

const get_authorization_code = async () => {
  const OAUTH_CLIENT_ID = process.env.TOCOnline_CLIENT_ID;
  const OAUTH_REDIRECT_URL = process.env.TOCOnline_OAUTH_REDIRECT_URL;

  let response = await TOConlineAPINoAuthorization().get(
    `oauth/auth?client_id=${OAUTH_CLIENT_ID}&redirect_uri=${OAUTH_REDIRECT_URL}&response_type=code&scope=commercial`
  );

  return response.request.path.split(/code=|&/)[1];
};

const exchange_authorization_code_for_token = async (auth: string) => {
  let response = await TOConlineToken().post(
    'oauth/token',
    new URLSearchParams({
      grant_type: 'authorization_code',
      code: auth,
      scope: 'commercial',
    })
  );

  return response.data;
};

const get_new_oauth_token = async () => {
  const auth = await get_authorization_code();

  let response = await exchange_authorization_code_for_token(auth);

  return response;
};
