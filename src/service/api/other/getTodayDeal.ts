import { ResponsePayloadInterface } from "./../../../helper/httpClient";
import { httpClient } from "../../../helper/httpClient";

export async function getTodayDeal() {
    return await httpClient.get<ResponsePayloadInterface<any>>(
        "/getTodayDeal"
    );
}
