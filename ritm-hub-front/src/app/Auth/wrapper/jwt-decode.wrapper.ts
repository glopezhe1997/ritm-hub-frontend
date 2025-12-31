import { jwtDecode } from 'jwt-decode';
export const jwtDecodeWrapper = {
  decodeJwt: (token: string) => jwtDecode(token)
};