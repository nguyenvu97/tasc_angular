import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layout/unauthen/login/login.component';
import { AuthenticateGuard } from './services/jwt/authenticate.guard';
import {RegisterComponent} from "./layout/unauthen/register/register.component";
import {BodyComponent} from "./layout/body/body.component";

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path:'register',
    component: RegisterComponent,
  },
  {
    path: '', component: BodyComponent
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
