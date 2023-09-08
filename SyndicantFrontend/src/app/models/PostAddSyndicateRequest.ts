import { IRequest } from "./IResponse";

export class PostAddSyndicateRequest implements IRequest {
    constructor(
        public name: string,
        public levelUp: string
    ) { }
}