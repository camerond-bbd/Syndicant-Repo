import { IRequest } from "./IResponse";

export interface PostAddGradResponse extends IRequest {
    name: string;
    email: string;
}