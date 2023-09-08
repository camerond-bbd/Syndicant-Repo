import { Component, OnInit } from '@angular/core';
import { GetGradsRequest } from 'src/app/models/GetGradsRequest';
import { GradModel } from 'src/app/models/GradModel';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-grad-list',
  templateUrl: './grad-list.component.html',
  styleUrls: ['./grad-list.component.scss']
})
export class GradListComponent implements OnInit {

  grads: GradModel[] = [];

  constructor(private httpService: RequestService) { }

  ngOnInit(): void {
    this.getGrads();
  }

  getGrads(): void {
    this.httpService.GetAllGradsRequest(new GetGradsRequest()).subscribe((response) => {
      console.log("Succesh");
      this.grads = response;
    });
  }
}
