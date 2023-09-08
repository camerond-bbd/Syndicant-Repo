import { Component, OnInit } from '@angular/core';
import { PostAddGradRequest } from 'src/app/models/PostAddGradRequest';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-add-grad',
  templateUrl: './add-grad.component.html',
  styleUrls: ['./add-grad.component.scss']
})
export class AddGradComponent implements OnInit {

  email: string = "";
  name: string = "";

  constructor(private httpService: RequestService) { }

  ngOnInit(): void {
  }

  addGrad(): void {
    this.httpService.PostAddGradRequest(new PostAddGradRequest(this.name, this.email))
      .subscribe((response) => {
        console.log("Added grad");
        console.log(response);
    });
  }

}
