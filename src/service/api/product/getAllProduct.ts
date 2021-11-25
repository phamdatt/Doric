import { ResponsePayloadInterface } from "./../../../helper/httpClient";
import { httpClient } from "../../../helper/httpClient";

export async function getAllProduct() {
  return await httpClient.get<ResponsePayloadInterface<any>>("/getAllProduct");
}
