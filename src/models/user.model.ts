export interface RequestAuth {
  email: string | null;
  password: string;
}
export interface ResponseAuth {
  id?: number;
  token: string;
}
