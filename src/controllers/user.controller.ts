import { RequestAuth, ResponseAuth } from "../models/user.model";

export class UserController {
  constructor(
    private endpointLogin?: string,
    private endpointRegister?: string
  ) {}

  //Controller Loguin Request Auth
  async postLogin(data: RequestAuth): Promise<ResponseAuth> {
    const domain: string = "https://reqres.in/api";
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const reqOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };
    const url = domain + this.endpointLogin;
    const result: Response = await fetch(url, reqOptions);
    if (result.ok) {
      const responseBodyLogin: ResponseAuth = await result.json();
      return responseBodyLogin;
    } else {
      throw new Error(`Login Error ${result.status}`);
    }
  }

  //Controler Register Request Auth
  async postRegister(data: RequestAuth): Promise<ResponseAuth> {
    const domain: string = "https://reqres.in/api";
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const reqOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };
    const url = domain + this.endpointRegister;
    const result: Response = await fetch(url, reqOptions);
    if (result.ok) {
      const responseBodyRegister: ResponseAuth = await result.json();
      return responseBodyRegister;
    } else {
      throw new Error(`Registration Error ${result.status}`);
    }
  }

  //Check Authentication by Token
  async checkToken(token: string | null, data: RequestAuth): Promise<boolean> {
    if (!token) {
      return false;
    }

    const domain: string = "https://reqres.in/api";
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    const reqOptions: RequestInit = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    };
    const url = `${domain}${this.endpointLogin}`;

    try {
      const result: Response = await fetch(url, reqOptions);

      if (result.ok) {
        const responseBodyLogin: ResponseAuth = await result.json();
        return responseBodyLogin.token === token;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking token:", error);
      return false;
    }
  }
}
