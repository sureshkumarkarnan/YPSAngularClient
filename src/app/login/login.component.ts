import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "../service/authentication.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  newcomponent = "Entered in loginComponent created";
  username;
  password;
  invalidLogin = false;

  constructor(
    private router: Router,
    private loginService: AuthenticationService
  ) {}
  ngOnInit() {}

  checkLogin() {
    if (this.loginService.authenticate(this.username, this.password)) {
      this.router.navigate([""]);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }
}
