import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';
declare let Swal: any;

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent {
  currentStep: number = 0;
  hide: boolean = true;
  isEmailCompleted = false;
  isCodeCompleted = false;
  isPasswordCompleted = false;
  userEmail: string = '';

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _LoadingService: LoadingService,
    private _Router: Router
  ) {}
  emailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  });
  newPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=[A-Z])(?=(?:[^0-9]*[0-9]){2}).{6,}$/),
    ]),
  });

  emailCheck(form: FormGroup) {
    if (form.valid) {
      this._LoadingService.showLoading();
      this._AuthenticationService.forgotPasswordMethod(form.value).subscribe({
        next: (response) => {
          this._LoadingService.removeLoading();
          this.isEmailCompleted = true;
          this.userEmail = form.get('email')?.value;
          setTimeout(() => {
            this.currentStep++;
          }, 500);
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            icon: 'success',
            customClass: {
              timerProgressBar: 'progress-bar',
            },
            showClass: {
              popup: 'animate__animated animate__fadeInRightBig',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutRightBig',
            },
            title: `${response.message}`,
          });
        },
        error: (err) => {
          this._LoadingService.removeLoading();
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 4000,
            icon: 'error',
            customClass: {
              timerProgressBar: 'progress-bar',
            },
            showClass: {
              popup: 'animate__animated animate__fadeInRightBig',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutRightBig',
            },
            title: `${err.error.message}`,
          });
        },
      });
    }
  }
  codeCheck(form: FormGroup) {
    if (form.valid) {
      this._LoadingService.showLoading();
      this._AuthenticationService.verifyResetCodeMethod(form.value).subscribe({
        next: (response) => {
          this._LoadingService.removeLoading();
          this.isCodeCompleted = true;
          setTimeout(() => {
            this.currentStep++;
          }, 500);
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            icon: 'success',
            customClass: {
              timerProgressBar: 'progress-bar',
            },
            showClass: {
              popup: 'animate__animated animate__fadeInRightBig',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutRightBig',
            },
            title: `${response.status} please enter your new password`,
          });
          let dataEmail = this.emailForm.get('email')?.value;
          if (dataEmail) {
            this.newPasswordForm.controls['email'].setValue(dataEmail);
          }
        },
        error: (err) => {
          this._LoadingService.removeLoading();
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 4000,
            icon: 'error',
            customClass: {
              timerProgressBar: 'progress-bar',
            },
            showClass: {
              popup: 'animate__animated animate__fadeInRightBig',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutRightBig',
            },
            title: `${err.error.message}`,
          });
        },
      });
    }
  }
  newPasswordCheck(form: FormGroup) {
    if (form.valid) {
      this._LoadingService.showLoading();
      this._AuthenticationService.resetPasswordMethod(form.value).subscribe({
        next: (response) => {
          this._LoadingService.removeLoading();
          this.isPasswordCompleted = true;
          setTimeout(() => {
            this._Router.navigate(['/login']);
          }, 500);
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            icon: 'success',
            customClass: {
              timerProgressBar: 'progress-bar',
            },
            showClass: {
              popup: 'animate__animated animate__fadeInRightBig',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutRightBig',
            },
            title: `Success please login to your account`,
          });
        },
        error: (err) => {
          this._LoadingService.removeLoading();
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 4000,
            icon: 'error',
            customClass: {
              timerProgressBar: 'progress-bar',
            },
            showClass: {
              popup: 'animate__animated animate__fadeInRightBig',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutRightBig',
            },
            title: `${err.error.message}`,
          });
        },
      });
    }
  }
}
