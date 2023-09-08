import { Component, OnInit } from '@angular/core';
import { PostAddLinkRequest } from 'src/app/models/PostLinkRequest';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-syndicate-allocation',
  templateUrl: './syndicate-allocation.component.html',
  styleUrls: ['./syndicate-allocation.component.scss']
})
export class SyndicateAllocationComponent implements OnInit {

  gradEmail: string = "";
  syndicateId: number = -1;

  constructor(private httpService: RequestService) { }

  ngOnInit(): void {
  }

  linkGradToSyndicate(): void {
    this.httpService.PostLinkRequest(new PostAddLinkRequest(this.syndicateId, this.gradEmail))
      .subscribe((response) => {
        
    });
  }

}
