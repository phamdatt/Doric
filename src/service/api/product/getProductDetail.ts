import { ResponsePayloadInterface } from './../../../helper/httpClient';
import { httpClient } from '../../../helper/httpClient';

export interface RequestParams {
  productId: String;
}

export async function getProductDetail(requestParams: RequestParams) {
  return await httpClient.get<ResponsePayloadInterface<any>>(
    `/product_detail/productId=${requestParams.productId}`
  );
}
