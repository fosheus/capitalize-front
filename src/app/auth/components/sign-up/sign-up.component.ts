import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  errorSignUp = false;
  signupSucceeded = false;
  errors = '';

  constructor(private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  userFormSubmitted(user: User): void {
    this.errorSignUp = true;
    this.authService.signUp(user).subscribe(() => this.signupSucceeded = true, (error) => console.log(error));
  }

  onCancel(): void {
    this.router.navigate(['../login'], { relativeTo: this.route });
  }



}
