import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeHTTPInterceptorService implements HttpInterceptor {

  constructor() { 
    const user = {
       username : 'admin',
       password : 'admin'
    }
    users.push(user);
     localStorage.setItem('users', JSON.stringify(users));

  }
intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {

const { url, method, headers, body } = req;
return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/login') && method === 'POST':
                    return authenticate();
                     default:
                    // pass through any requests not handled above
                    return next.handle(req);
            }
        }
        function authenticate() {
          const { username, password } = body;
           const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                username: user.username,
                token: 'fake-jwt-token'
            })
        }
 function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }
}

}
