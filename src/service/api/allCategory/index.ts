import { ResponsePayloadInterface } from './../../../helper/httpClient';
import { httpClient } from '../../../helper/httpClient';
import { RequestParams } from './types';

export async function getCategoryBySlugAndCatId(requestParams: RequestParams) {
  return await httpClient.get<ResponsePayloadInterface<any>>(
    `/search_category/get_category_by_slug/slug=${requestParams.slug}/catId=${requestParams.catId}`
  );
}
