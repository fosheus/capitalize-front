import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signupForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    confirmPassword: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  public errorSignup = false;

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.signupForm.valid || this.signupForm.controls.password.value !== this.signupForm.controls.confirmPassword.value) {
      this.errorSignup = true;
      return;
    }
    const user = new User(
      this.signupForm.controls.firstname.value,
      this.signupForm.controls.lastname.value,
      this.signupForm.controls.email.value,
      this.signupForm.controls.username.value,
      this.signupForm.controls.password.value
    );
    this.authService.signUp(user).subscribe(() => {
      this.router.navigateByUrl('/auth/login');
    }, error => this.errorSignup = true);
  }

}
