import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../service/authentication.service";
import { first } from 'rxjs/operators';
@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  newcomponent = "Entered in loginComponent created";
  currentUser: any;
  username;
  password;
  invalidLogin = false;
loading = false;
error:string;
  constructor(
    private router: Router,
    private loginService: AuthenticationService
  ) {
	   this.loginService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit() {}

  checkLogin() {
	   this.loading = true;
   this.loginService.authenticate(this.username, this.password)
   .pipe(first())
            .subscribe(
                data => {
                     console.log("checkLogin success");
					  this.router.navigate(['/']);
					  this.invalidLogin = false;
                },
                error => {
                    this.error = error;
                    this.loading = false;
					console.log("checkLogin failed");
					this.invalidLogin = true;
                });
     
    } 
  }

