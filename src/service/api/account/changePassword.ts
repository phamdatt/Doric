import { httpClient } from "@/helper/httpClient";
export interface RequestParamsInterface {
  token: string;
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
}

export async function changePassword(requestParams: RequestParamsInterface) {
  return await httpClient.post("/account/changePassword", { ...requestParams });
}
