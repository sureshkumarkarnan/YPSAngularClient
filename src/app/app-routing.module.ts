import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { StudentComponent } from "./student/student.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { AuthGaurdService } from "./service/auth-gaurd.service";
import { AddStudentComponent } from "./student/add-student.component";
const routes: Routes = [
   
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: 'students',
    component: StudentComponent,
    canActivate: [AuthGaurdService]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "logout",
    component: LogoutComponent,
    canActivate: [AuthGaurdService]
  },
   {
    path: "add-student",
    component: AddStudentComponent,
    canActivate: [AuthGaurdService]
  },
  {
  path: '',
  redirectTo: '/home',
  pathMatch: 'full'
  },
  {
	path: '**',
	redirectTo: '/home',
	pathMatch: 'full'
   }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
