import { ResponsePayloadInterface } from "./../../../helper/httpClient";
import { httpClient } from "../../../helper/httpClient";
export interface RequestParams {
    orderId: string;
}
export async function getOrderDetail(request: RequestParams) {
    console.log(request.orderId)
    return await httpClient.get<ResponsePayloadInterface<any>>(`/orders/getOrderDetail/orderId=${request.orderId}`);
}
