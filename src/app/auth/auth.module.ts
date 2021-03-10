import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthMainComponent } from './components/auth-main/auth-main.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [LoginComponent, SignUpComponent, AuthMainComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
