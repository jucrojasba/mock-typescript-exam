export interface RequestAuth {
  email: string;
  password: string;
}
export interface ResponseAuth {
  id?: number;
  token: string;
}
