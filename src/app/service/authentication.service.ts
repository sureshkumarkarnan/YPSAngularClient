import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

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
constructor(    private httpClient:HttpClient ) {      }

  authenticate(username, password) {
//const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    console.log("in autenticate");

    return this.httpClient.post<any>('http://localhost:8080/login',{username,password}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username',username);
        let authString = 'Bearer ' + userData.token;
          sessionStorage.setItem('token', authString);
        return userData;
       }
     )

    );
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
   // console.log(!(user === null));
    return !(user === null);
  }
  logOut() {
    sessionStorage.removeItem("username");
  }
}
