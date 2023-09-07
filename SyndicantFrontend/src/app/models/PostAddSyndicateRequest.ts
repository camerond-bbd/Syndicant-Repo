import { IRequest } from "./IResponse";

export interface PostAddSyndicateRequest extends IRequest {
    name: string;
    levelUp: string;
}