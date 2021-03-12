import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";

import { HttpClientModule } from "@angular/common/http";

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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    StudentComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,FormsModule],
  providers: [HttpClientService, AuthenticationService,{ provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
