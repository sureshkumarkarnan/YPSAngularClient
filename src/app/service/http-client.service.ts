import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

export class Student {
  constructor(public id: string, public title: string) {}
}

@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  private apiurl = "https://jsonplaceholder.typicode.com/todos";
  constructor(private httpClient: HttpClient) {}

  getStudents() {
    console.log("i am at getStudents");
    // return this.httpClient.get(this.apiurl);
    return this.httpClient.get<Student[]>(this.apiurl);
  }

  public deleteStudent(student) {}
}
