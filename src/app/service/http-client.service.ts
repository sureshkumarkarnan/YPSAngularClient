import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export class Student {
  constructor(public id: string, public title: string) {}
}

@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  private baseUrl : string = 'http://localhost:8080/Students/';
  constructor(private httpClient: HttpClient) {}

  getStudents() {
    console.log("i am at getStudents");
    return this.httpClient.get<Student[]>(this.baseUrl);
  }

getStudentById ( id:number) {
  return this.httpClient.get<Student>(this.baseUrl + id);
}
  deleteStudent(student : Student) {
    return this.httpClient.delete(this.baseUrl + student.id);
  }

  createStudent(student:Student) {
    return this.httpClient.post(this.baseUrl,student);
  }

updateStudent(student:Student) {
    return this.httpClient.put(this.baseUrl+ student.id, student);
  }

}
