import { ResponsePayloadInterface } from "./../../../helper/httpClient";
import { httpClient } from "../../../helper/httpClient";

export interface RequestParams {
  // userId: '61c05331752b2516d230208d';
  productId: any;
}
export async function addToCart(req: RequestParams) {
  return await httpClient.post<ResponsePayloadInterface>("/card/add_to_cart/", {
    ...req,
  });
}
