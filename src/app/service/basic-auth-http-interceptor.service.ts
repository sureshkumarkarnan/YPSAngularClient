import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor{

  constructor(private authenticationService: AuthenticationService) {}

intercept(req: HttpRequest<any>, next: HttpHandler) {
  let currentUser = this.authenticationService.currentUserValue;
if (currentUser && currentUser.token) {
  console.log(currentUser.token);
      req = req.clone({
        setHeaders: {
          Authorization : 'Bearer ' + currentUser.token
        }
      });
  }
     return next.handle(req);
}
}

