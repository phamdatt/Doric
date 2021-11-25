import { ResponsePayloadInterface } from './../../../helper/httpClient';
import { httpClient } from '../../../helper/httpClient';

export async function getMenu() {
  return await httpClient.get<ResponsePayloadInterface>(
    '/category/get_category/'
  );
}
