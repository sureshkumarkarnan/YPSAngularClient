import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Student } from "../student/student";



@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  private baseUrl : string = 'http://localhost:8080/Students';
  constructor(private httpClient: HttpClient) {}

  getStudents():Observable<any> {
    console.log("i am at getStudents");
    return this.httpClient.get<Student[]>(this.baseUrl);
  }

getStudentById ( id:number) {
  return this.httpClient.get<Student>(this.baseUrl + id);
}
  deleteStudent(student : Student): Observable<any>{
    return this.httpClient.delete(this.baseUrl + student.id);
  }

  createStudent(student:Student) {
    return this.httpClient.post(this.baseUrl,student);
  }

updateStudent(student:Student) {
    return this.httpClient.put(this.baseUrl+ student.id, student);
  }

}
