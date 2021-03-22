import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";

import { HttpClientModule , HTTP_INTERCEPTORS  } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";

import { HomeComponent } from "./home/home.component";
import { StudentComponent } from "./student/student.component";
import { HttpClientService } from "./service/http-client.service";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { AuthenticationService } from "./service/authentication.service";
import { FormsModule } from "@angular/forms";
import { BasicAuthHttpInterceptorService } from "./service/basic-auth-http-interceptor.service";
import { FakeHTTPInterceptorService } from "./service/fake-httpinterceptor.service";
import { AddStudentComponent } from "./student/add-student.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    StudentComponent,
    LoginComponent,
    LogoutComponent,
    AddStudentComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,FormsModule],
  providers: [HttpClientService, AuthenticationService,
 /* { provide:HTTP_INTERCEPTORS, useClass:BasicAuthHttpInterceptorService, multi:true },*/
  { provide:HTTP_INTERCEPTORS, useClass:FakeHTTPInterceptorService, multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
