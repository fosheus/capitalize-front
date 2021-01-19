import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthMainComponent } from './components/auth-main/auth-main.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: 'auth', component: AuthMainComponent, children: [
      { path: 'login', component: LoginComponent },
      { path: 'sign-up', component: SignUpComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
