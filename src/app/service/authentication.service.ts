import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

export class User{
  constructor(
    public status:string,
     ) {}
  
}

export class JwtResponse {
  constructor( public jwttoken:string) {}
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {

private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

constructor(    private httpClient:HttpClient ) {  
this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
		}

public get currentUserValue() {
        return this.currentUserSubject.value;
    }
	
  authenticate(username, password)  {
    console.log("in authenticate service : autenticate");
	const body = { username : username,password : password };
    return this.httpClient.post<any>('http://localhost:8080/login',body )
		.pipe(map(user => {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
		this.currentUserSubject.next(user);
        console.log(user);
		return user;
    }));
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem("currentUser");
   // console.log(!(user === null));
    return !(user === null);
  }
  logOut() {
    sessionStorage.removeItem("currentUser");
	this.currentUserSubject.next(null);
  }
}
