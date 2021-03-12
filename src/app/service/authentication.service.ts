import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class User{
  constructor(
    public status:string,
     ) {}
  
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
constructor(    private httpClient:HttpClient ) {      }

  authenticate(username, password) {
     const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    console.log("in autenticate");
    return this.httpClient.get<User>('http://localhost:8080/login',{headers}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username',username);
        let authString = 'Basic ' + btoa(username + ':' + password);
          sessionStorage.setItem('basicauth', authString);
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
