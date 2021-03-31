import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClientService } from "../service/http-client.service";
import { Student } from "./student";

@Component({
  selector: "students",
  templateUrl:"./student.component.html",
  styleUrls: ["./student.component.css"]
})
export class StudentComponent implements OnInit {
  public students=[];
  title : string ;
  currentStudent : any;
  constructor(private  router : Router,private httpClientService: HttpClientService) {}

  handleSuccessfulResponse(response) {
     console.log(response);
     
    this.students =response; 
     console.log( this.students);
  }

  ngOnInit() {
    // this.httpClientService.getStudents().subscribe((data) => {
    //  this.users = Array.from(Object.keys(data), (k) => data[k]);
    this.getStudents();
    }

getStudents() : void{
 this.httpClientService
      .getStudents()
      .subscribe(response => this.handleSuccessfulResponse(response));
 

}

viewStudent  (student : Student) : void {
   this.httpClientService.getStudentById(student.id)
   .subscribe((response) =>  {
      console.log(response);
      this.currentStudent = response;
   });
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
