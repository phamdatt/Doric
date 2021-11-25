import { ResponsePayloadInterface } from "./../../../helper/httpClient";
import { httpClient } from "../../../helper/httpClient";

export interface RequestParams {
  userId: string;
  productId: any;
  quantity: number;
  price: number;
}
export async function addToCart(req: RequestParams) {
  return await httpClient.post<ResponsePayloadInterface>("/card/add_to_cart/", {
    ...req,
  });
}
