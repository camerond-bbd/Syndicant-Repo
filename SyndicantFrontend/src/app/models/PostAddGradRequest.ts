import { IRequest } from "./IResponse";

export class PostAddGradRequest implements IRequest {
    constructor(
        name: string,
        email: string
    ) { }
}