import { ResponsePayloadInterface } from "./../../../helper/httpClient";
import { httpClient } from "../../../helper/httpClient";

export async function getProductFavorite() {
  return await httpClient.get<ResponsePayloadInterface<any>>(
    "/product_favorite"
  );
}
