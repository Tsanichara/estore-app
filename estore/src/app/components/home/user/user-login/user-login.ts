import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css'
})
export class UserLogin {
  userLoginForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.userLoginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('email');
  }

  get password(): AbstractControl<any, any> | null {
    return this.userLoginForm.get('password');
  }


  onSubmit(): void {}
}
