import { IRequest } from "./IResponse";

export class PostAddSyndicateRequest implements IRequest {
    constructor(
        name: string,
        levelUp: string
    ) { }
}