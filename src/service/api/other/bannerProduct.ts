import { ResponsePayloadInterface } from "./../../../helper/httpClient";
import { httpClient } from "../../../helper/httpClient";

export async function getBannerProduct() {
  return await httpClient.get<ResponsePayloadInterface<any>>(
    "/banner/get_banner"
  );
}
