import { IRequest } from "./IResponse";

export interface PostAddLinkRequest extends IRequest {
    syndicateId: number;
    gradEmail: string;
}