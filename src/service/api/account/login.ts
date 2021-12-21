import { ResponsePayloadInterface } from './../../../helper/httpClient';
import { httpClient } from "@/helper/httpClient";
export interface RequestParamsInterface {
  email: string;
  password: string;
}

export async function loginAccount(requestParams: RequestParamsInterface) {
  return await httpClient.post<ResponsePayloadInterface>("/account/login", { ...requestParams });
}
