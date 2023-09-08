import { ArrayType } from '@angular/compiler';
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

  levelUps: string[] = [];
  syndicates: Syndicate[] = [];
  
  constructor(private httpService: RequestService) { }

  ngOnInit(): void {
    this.httpService.GetAllLevelUps()
      .subscribe((response) => {
        this.levelUps = response;
      });
  }
  
  getSyndicates() {
    this.httpService.GetSyndicatesByLevelUp(this.levelUp)
      .subscribe((response) => {
        console.log(response);
        this.syndicates = [];
        for (let i=0; i<response.length; i++) {
          this.syndicates.push(new Syndicate(response[i].name, response[i].levelUp));
        }
      });
  }

  addSyndicate(){
    this.httpService.PostLinkRequest(new PostAddLinkRequest(this.email, new Syndicate(this.syndicateName, this.levelUp)))
      .subscribe((response) => {
        console.log("Added syndicate");
        console.log(response);
      });
  }
}
