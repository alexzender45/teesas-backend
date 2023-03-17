export interface IJwtPayload {
  id: string | any;
  username: string;
  aud?: string;
  iat?: string;
  exp?: string;
}
