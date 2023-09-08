import { IRequest } from "./IResponse";
import { Syndicate } from "./SyndicateModel";

export class PostAddLinkRequest implements IRequest {
    constructor(
        public gradEmail: string,
        public syndicate: Syndicate
    ) { }
}