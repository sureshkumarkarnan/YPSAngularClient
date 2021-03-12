import { Component, OnInit } from "@angular/core";
import { HttpClientService } from "../service/http-client.service";

@Component({
  selector: "students",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"]
})
export class StudentComponent implements OnInit {
  public students = [];
  constructor(private httpClientService: HttpClientService) {}

  handleSuccessfulResponse(response) {
    this.students = response;
  }

  ngOnInit() {
    // this.httpClientService.getStudents().subscribe((data) => {
    //  this.users = Array.from(Object.keys(data), (k) => data[k]);
    this.httpClientService
      .getStudents()
      .subscribe((response) => this.handleSuccessfulResponse(response));
  }
}
