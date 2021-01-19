import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signupForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    confirmPassord: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.signupForm.controls.password.value === this.signupForm.controls.confirmPassword.value) {
      const user = new User(
        this.signupForm.controls.firstname.value,
        this.signupForm.controls.lastnam.value,
        this.signupForm.controls.email.value,
        this.signupForm.controls.username.value,
        this.signupForm.controls.password.value
      );
      this.authService.signUp(user).subscribe(() => {
        this.router.navigateByUrl('/auth/login');
      });
    }
  }

}
