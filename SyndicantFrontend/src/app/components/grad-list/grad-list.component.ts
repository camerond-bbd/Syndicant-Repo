import { Component, OnInit } from '@angular/core';
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

}
