import { Component, OnInit } from '@angular/core';
import { GradModel } from 'src/app/models/GradModel';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  gradText: string = "";
  gradList: string[] = [];

  constructor(private httpService: RequestService) { }

  ngOnInit(): void {
  }

  getNewList() {
    let sendList = this.gradText.split(" ");
    console.log(sendList);
    this.httpService.testCompatibility(sendList)
      .subscribe((response) => {
        console.log("Received response");
        console.log(response);
      })

  }

}
