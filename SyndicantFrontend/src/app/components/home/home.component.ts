import { Component, OnInit } from '@angular/core';
import { CompatibilityResponse } from 'src/app/models/CompatibilityResponse';
import { GradModel } from 'src/app/models/GradModel';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  gradText: string = "";
  gradList: CompatibilityResponse[] = [];

  constructor(private httpService: RequestService) { }

  ngOnInit(): void {
    this.gradList.push(new CompatibilityResponse("t1", [
      "t2",
      "t2"
    ]));
    this.gradList.push(new CompatibilityResponse("t1", []));
  }

  getNewList() {
    let sendList = this.gradText.split(/\s+/g);
    console.log(sendList);

    this.gradList = [];

    this.httpService.testCompatibility(sendList)
      .subscribe((response) => {
        console.log("Received response");
        console.log(response);

        sendList.forEach(element => {
          this.gradList.push(new CompatibilityResponse("", []));
        });

        let count = 0;

        Object.keys(response).forEach(k => {
          this.gradList[count].gradEmail = k;
          count++;
        });

        count = 0;

        Object.values(response).forEach(r => {
          this.gradList[count].otherGradEmail = r;
          count++;
        });

        //this.gradList = response;
      })

  }

}
