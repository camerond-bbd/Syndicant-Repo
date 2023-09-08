import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostAddSyndicateRequest } from '../models/PostAddSyndicateRequest';
import { PostAddSyndicateResponse } from '../models/PostAddSyndicateResponse';
import { PostAddGradRequest } from '../models/PostAddGradRequest';
import { PostAddGradResponse } from '../models/PostAddGradResponse';
import { GetGradsRequest } from '../models/GetGradsRequest';
import { GetGradsResponse } from '../models/GetGradsResponse';
import { PostAddLinkRequest } from '../models/PostLinkRequest';
import { PostAddLinkResponse } from '../models/PostAddLinkResponse';
import { Syndicate } from '../models/SyndicateModel';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private url: string = "https://k7wmazpbpd.eu-west-1.awsapprunner.com/";

  constructor(private http: HttpClient) { }

  public PostAddSyndicateRequest(request: PostAddSyndicateRequest): Observable<PostAddSyndicateResponse> {
    return this.http.post<PostAddSyndicateResponse>(this.url + "syndicate", {
      name: request.name,
      levelUp: request.levelUp
    });
  }

  public PostAddGradRequest(request: PostAddGradRequest): Observable<PostAddGradResponse> {
    return this.http.post<PostAddGradResponse>(this.url + "grad", {
      name: request.name,
      email: request.email
    });
  }

  public PostLinkRequest(request: PostAddLinkRequest): Observable<PostAddLinkResponse> {
    return this.http.post<PostAddLinkResponse>(this.url + "link_to_syndicate", {
      gradEmail: request.gradEmail,
      syndicate: {
        name: request.syndicate.name,
        levelUp: request.syndicate.levelUp
      }
    });
  }

  public GetAllGradsRequest(request: GetGradsRequest): Observable<GetGradsResponse> {
    return this.http.get<GetGradsResponse>(this.url + "grads/all");
  }

  public GetSyndicatesByLevelUp(levelUp: string) {
    return this.http.post<Syndicate[]>(this.url + "syndicate/for-levelup", {
      levelUp: levelUp
    });
  }

  public GetAllLevelUps() {
    return this.http.get<string[]>(this.url + "levelups/all");
  }
}
