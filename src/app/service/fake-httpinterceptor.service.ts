import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';



@Injectable()
export class FakeHTTPInterceptorService implements HttpInterceptor {

    studentsList = [
        {	
            id : 1,
            first_name : "Sangwin",
            last_name : "Gawande",
            email : "sangwin@yopmail.com",
            phone : 9503733178,
            department : "Science"
        },
        {
            id : 2,
            first_name : "Oman",
            last_name : "Umir",
            email : "oman@yopmail.com",
            phone : 8574889658,
            department : "Commerce"
        },
        {
            id : 3,
            first_name : "Tina",
            last_name : "Dillon",
            email : "tina@yopmail.com",
            phone : 7485889658,
            department : "Science"
        },
        {
            id : 4,
            first_name : "John",
            last_name : "Doe",
            email : "john@yopmail.com",
            phone : 9685589748,
            department : "Arts"
        },
        {
            id : 5,
            first_name : "Peter",
            last_name : "Parker",
            email : "peter@yopmail.com",
            phone : 8595856547,
            department : "Engineering"
        }
        ];
    
        users = [
            {
                username : 'admin',
                password : 'admin'
            }
        ];

        
  constructor() { 
       
     localStorage.setItem('users', JSON.stringify(this.users));
     localStorage.setItem('students',JSON.stringify(this.studentsList));

  }
intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {

const { url, method, headers, body } = req;
return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() :Observable<any>  {
            switch (true) {
                case url.endsWith('/login') && method === 'POST':
                    return authenticate();
                    case url.endsWith('/Students/') && method === 'GET':
                    return getStudents();
                    case url.endsWith('/Students/') && method === 'POST':
                    return addStudent();
                     default:
                    // pass through any requests not handled above
                    return next.handle(req);
            }
        }

        function getStudents() {
              return ok(this.studentsList);
        }

         function addStudent() {
             const student = body;
             return ok();
        }

        function authenticate() {
            console.log("in fake autenticate");
     
         // const { username, password } = body;
          //  const user = this.users.find(x => x.username === username && x.password === password);
          /*  if (!user)  {
                console.log("Username or password is incorrect");

                return error('Username or password is incorrect');
            }*/
            return ok({
                username: "admin",
                token: 'fake-jwt-token'
            })
        }
 function ok(body?) {
    console.log("ok response");
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }
}

}
