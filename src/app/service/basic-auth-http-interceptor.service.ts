import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHttpInterceptorService implements HttpInterceptor{

  constructor() { }

intercept(req: HttpRequest<any>, next: HttpHandler) {
      return next.handle(req);
}
}
