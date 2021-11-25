import { ResponsePayloadInterface } from "./../../../helper/httpClient";
import { httpClient } from "../../../helper/httpClient";

export interface RequestParamsInteface {
  productId: string;
}
export async function addProductFavorite(
  requestParams: RequestParamsInteface
) {
  return await httpClient.put<ResponsePayloadInterface<any>>(
    `/add_favorite/productId=${requestParams.productId}`
  );
}
