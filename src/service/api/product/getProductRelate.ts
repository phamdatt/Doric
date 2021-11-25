import { ResponsePayloadInterface } from './../../../helper/httpClient';
import { httpClient } from '../../../helper/httpClient';

export interface RequestParams {
  catId: Number;
}

export async function getProductRelate(requestParams: RequestParams) {
  return await httpClient.get<ResponsePayloadInterface<any>>(
    `/product_relate_to/catId=${requestParams.catId}`
  );
}
