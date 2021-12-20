import { httpClient } from "@/helper/httpClient";
export interface RequestParamsInterface {
  email: string;
}

export async function getUserInfo(requestParams: RequestParamsInterface) {
  return await httpClient.post("/auth/getUserInfo", { ...requestParams });
}
