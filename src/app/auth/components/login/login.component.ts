import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorLoggin: boolean;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private authService: AuthenticationService, private router: Router) { }


  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit() {
    const loginModel = { username: this.loginForm.controls.username.value, password: this.loginForm.controls.password.value };
    this.errorLoggin = false;
    this.authService.login(loginModel).subscribe(resp => {
      this.router.navigateByUrl('/home')
    }, err => this.errorLoggin = true);
  }
}
