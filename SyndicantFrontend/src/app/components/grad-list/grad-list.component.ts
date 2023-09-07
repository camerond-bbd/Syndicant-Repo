import { Component, OnInit } from '@angular/core';
import { GetGradsRequest } from 'src/app/models/GetGradsRequest';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-grad-list',
  templateUrl: './grad-list.component.html',
  styleUrls: ['./grad-list.component.scss']
})
export class GradListComponent implements OnInit {

  constructor(private httpService: RequestService) { }

  ngOnInit(): void {
    
  }

  addGrad(): void {
    this.httpService.GetAllGradsRequest(new GetGradsRequest()).subscribe((res) => {
      console.log("Succesh");
    });
  }
}
