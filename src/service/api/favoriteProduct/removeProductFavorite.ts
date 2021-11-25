import { ResponsePayloadInterface } from "./../../../helper/httpClient";
import { httpClient } from "../../../helper/httpClient";

export interface RequestParamsInteface {
  productId: string;
}
export async function removeProductFavorite(
  requestParams: RequestParamsInteface
) {
  return await httpClient.put<ResponsePayloadInterface<any>>(
    `/remove_favorite/productId=${requestParams.productId}`
  );
}
