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

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const loginModel = { username: this.loginForm.controls.username.value, password: this.loginForm.controls.password.value };
    this.authService.login(loginModel).subscribe(resp => {
      const keys = resp.headers.keys();
      const header = resp.headers.get('Authorization');
      if (header) {
        const token = header.replace('Bearer ', '');
        localStorage.setItem('access-token', token);
        this.router.navigateByUrl('/home');
      }
    });
  }
}
