import { httpClient } from "@/helper/httpClient";
export interface RequestParamsInterface {
  email: string;
  password: string;
  username: string;
  phonenumber: number;
  gender: number;
  birthday: number;
}

export async function register(requestParams: RequestParamsInterface) {
  return await httpClient.post("/auth/register", {...requestParams});
}
