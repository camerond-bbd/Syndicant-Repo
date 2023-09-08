import { Component, OnInit } from '@angular/core';
import { PostAddSyndicateRequest } from 'src/app/models/PostAddSyndicateRequest';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-add-syndicate',
  templateUrl: './add-syndicate.component.html',
  styleUrls: ['./add-syndicate.component.scss']
})
export class AddSyndicateComponent implements OnInit {

  name: string = "";
  levelUp: string = "";
  levelUps: string[] = [];
  
  constructor(private httpService: RequestService) { }

  ngOnInit(): void {
    this.httpService.GetAllLevelUps()
      .subscribe((response) => {
        this.levelUps = response;
      });
  }

  addSyndicate(){
    this.httpService.PostAddSyndicateRequest(new PostAddSyndicateRequest(this.name, this.levelUp))
      .subscribe((response) => {
        console.log("Added syndicate");
        console.log(response);
      });
  }

}
