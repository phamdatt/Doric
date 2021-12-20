import { httpClient } from "@/helper/httpClient";
export interface RequestParamsInterface {
  email: string;
  password: string;
}

export async function login(requestParams: RequestParamsInterface) {
  return await httpClient.post("/auth/login", { ...requestParams });
}
