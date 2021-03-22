import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClientService, Student } from "../service/http-client.service";

@Component({
  selector: "students",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"]
})
export class StudentComponent implements OnInit {
  public students = [];
  constructor(private  router : Router,private httpClientService: HttpClientService) {}

  handleSuccessfulResponse(response) {
     console.log(response);
    this.students = response;
    
  }

  ngOnInit() {
    // this.httpClientService.getStudents().subscribe((data) => {
    //  this.users = Array.from(Object.keys(data), (k) => data[k]);
    this.getStudents();
    }

getStudents() : void{
 this.httpClientService
      .getStudents()
      .subscribe((response) => this.handleSuccessfulResponse(response));
 

}
    deleteStudent(student : Student) : void {
    
    this.httpClientService.deleteStudent(student)
    .subscribe((response) => { 
      console.log(response);
      this.getStudents();
      },
      error => {
        console.log(error);
      });
  }

  addStudent() : void {
  this.router.navigate(['add-student']);
  }

}
