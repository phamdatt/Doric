import { httpClient } from "@/helper/httpClient";
export interface RequestParamsInterface {
  email: string;
  password: string;
  username: string;
  phonenumber: string;
  gender: any;
  birthday: string;
}

export async function register(requestParams: RequestParamsInterface) {
  const data = new FormData();
  data.append("email", requestParams.email);
  data.append("password", requestParams.password);
  data.append("username", requestParams.username);
  data.append("phonenumber", requestParams.phonenumber);
  data.append("gender", requestParams.gender);
  data.append("birthday", requestParams.birthday);
  return await httpClient.post("/auth/register", data);
}
