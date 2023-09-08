import { IRequest } from "./IResponse";

export class PostAddGradRequest implements IRequest {
    constructor(
        public name: string,
        public email: string
    ) { }
}