import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user/userService';
import { LoginToken } from '../../types/user.type';
import { NgClass } from '@angular/common';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-login',
  imports: [ɵInternalFormsSharedModule, ReactiveFormsModule, NgClass],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css'
})
export class UserLogin {
  userLoginForm: FormGroup;
  alertType: number = 0;
  alertMessage: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private location: Location, private router: Router){
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


  onSubmit(): void {
    if(this.userLoginForm.invalid){
      this.alertMessage = 'Please fill both email and password.'
      this.alertType = 1;
      this.userLoginForm.markAllAsTouched();
      return;
    }
    const {email, password} = this.userLoginForm.value;

    this.userLoginForm.disable();

    this.userService.login(email, password).subscribe({
      next: (result: LoginToken) => {
        this.userLoginForm.enable();

        if(result.token){
          this.userService.activateToken(result);
          this.alertMessage = 'Login successful';
          this.alertType = 0;
          this.userLoginForm.reset();
        } else {
          this.alertMessage = 'Invalid login attempt.'
          this.alertType = 1;
        }
        setTimeout(() => {
          this.router.navigate(['/home']);

        })
      },
      error: (err) => {
        this.userLoginForm.enable();
        this.alertMessage = err.error?.message || 'Login failed. Please try again.';
        this.alertType = 2;
      }
    });
  }
}
