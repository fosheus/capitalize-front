import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-first-run',
  templateUrl: './first-run.component.html',
  styleUrls: ['./first-run.component.scss']
})
export class FirstRunComponent implements OnInit {

  errorSignUp = false;
  signupSucceeded = false;

  constructor(private authService: AuthenticationService) { }


  ngOnInit(): void {
  }

  userFormSubmitted(user: User): void {
    this.errorSignUp = true;
    this.authService.signUp(user).subscribe(() => this.signupSucceeded = true, () => this.errorSignUp = true);
  }




}
