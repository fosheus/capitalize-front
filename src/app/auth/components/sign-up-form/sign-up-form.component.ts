import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit {

  signupForm = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    confirmPassword: new FormControl('', [Validators.required, SignUpFormComponent.checkPasswords]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,}$/)])
  });


  @Output()
  formSubmit = new EventEmitter<User>();

  @Output()
  cancel = new EventEmitter();

  errorInvalidForm = false;

  private static checkPasswords: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.errorInvalidForm = false;
    if (!this.signupForm.valid || this.signupForm.controls.password.value !== this.signupForm.controls.confirmPassword.value) {
      this.errorInvalidForm = true;
    } else {
      const user = new User(
        this.signupForm.controls.firstname.value,
        this.signupForm.controls.lastname.value,
        this.signupForm.controls.email.value,
        this.signupForm.controls.username.value,
        this.signupForm.controls.password.value
      );
      this.formSubmit.emit(user);

    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
