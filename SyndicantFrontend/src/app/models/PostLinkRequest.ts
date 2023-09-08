import { IRequest } from "./IResponse";

export class PostAddLinkRequest implements IRequest {
    constructor(
        syndicateId: number,
        gradEmail: string
    ) { }
}