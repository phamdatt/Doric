import { ResponsePayloadInterface } from "./../../../helper/httpClient";
import { httpClient } from "../../../helper/httpClient";
export interface RequestParams {
    email: string;
    address: string;
    productId: string;
    totalPrice: number;
    orderStatus: number;
    phone: string;
    name: string;
}
export async function addOrder(request: RequestParams) {
    return await httpClient.post<ResponsePayloadInterface<any>>("/orders/addOrder", { ...request });
}
