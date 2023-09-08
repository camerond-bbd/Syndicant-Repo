import { Component, OnInit } from '@angular/core';
import { PostAddLinkRequest } from 'src/app/models/PostLinkRequest';
import { Syndicate } from 'src/app/models/SyndicateModel';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-syndicate-allocation',
  templateUrl: './syndicate-allocation.component.html',
  styleUrls: ['./syndicate-allocation.component.scss']
})
export class SyndicateAllocationComponent implements OnInit {
  email: string = "";

  syndicateName: string = "";
  levelUp: string = "";

  syndicates: Syndicate[] = [];
  
  constructor(private httpService: RequestService) { }

  ngOnInit(): void {
  }
  
  getSyndicates() {
    
  }

  addSyndicate(){
    this.httpService.PostLinkRequest(new PostAddLinkRequest(this.email, new Syndicate(this.syndicateName, this.levelUp)))
      .subscribe((response) => {
        console.log("Added syndicate");
        console.log(response);
      });
  }
}
