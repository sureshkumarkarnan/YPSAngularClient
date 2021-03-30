import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Student } from '../student/student';




@Injectable()
export class FakeHTTPInterceptorService implements HttpInterceptor {

stringJson: any;
stringObject: any;
  courseList = [
    {
      id: "1",
      fname: "Java programming",
      author: "Franc"
    },
    {
      id: "2",
      fname: "Learn Typescript programming",
      author: "John"
    }
  ];
    
constructor() { 
this.stringJson = JSON.stringify(this.courseList);
  }

intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
return this.handleRequests(req, next);
}
handleRequests(req: HttpRequest<any>,next: HttpHandler): any {
const { url, method, headers, body } = req;

switch (true) {
                case url.endsWith('/login') && method === 'POST':
                    return this.authenticate();
                    case url.endsWith('/Students/') && method === 'GET':
                     {
                         console.log("in fake getStudents");
                       return of(new HttpResponse({ status: 200, body: this.stringJson }));
        
                    }
                    case url.endsWith('/Students/') && method === 'POST':
                    default:
                    // pass through any requests not handled above
                    return next.handle(req);
            }

}

 authenticate() :any {
            console.log("in fake autenticate");
            let body = { username: "admin", token: 'fake-jwt-token'}
            return of(new HttpResponse({status : 200 , body})).pipe(delay(500))
        }

}
