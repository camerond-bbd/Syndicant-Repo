import { IRequest } from "./IResponse";

export interface PostAddGradRequest extends IRequest {
    name: string;
    email: string;
}