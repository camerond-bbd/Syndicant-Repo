import { IResponse } from "./IRequest";

export interface PostAddLinkResponse extends IResponse {
    syndicateId: number;
    gradEmail: string;
}