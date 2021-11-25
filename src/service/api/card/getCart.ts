import { ResponsePayloadInterface } from "./../../../helper/httpClient";
import { httpClient } from "../../../helper/httpClient";

export async function getCart() {
  return await httpClient.get<ResponsePayloadInterface>("/card/get_cart");
}
