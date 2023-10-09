import { AuthenticationService } from '../../services/authentication.service';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

declare let Swal: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', './register.component.media.css'],
})

export class RegisterComponent {
  hide: boolean = true;
  
  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router,
    private _LoadingService: LoadingService
  ) {}

  registrationForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(?=[A-Z])(?=(?:[^0-9]*[0-9]){2}).{6,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[1250][0-9]{8}$/),
      ]),
    },
    { validators: this.checkRePassword }
  );

  checkRePassword(form: any) {
    let password = form.get('password');
    let rePassword = form.get('rePassword');
    if (!rePassword?.value) {
      rePassword?.setErrors({ required: true });
    } else if (password?.value !== rePassword?.value) {
      rePassword?.setErrors({ notmatch: true });
    }
    return null;
  }

  handleRegistration(form: FormGroup) {
    if (form.valid) {
      this._LoadingService.showLoading();
      this._AuthenticationService.registerMethod(form.value).subscribe({
        next: () => {
          this._LoadingService.removeLoading();
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
            title: 'Your account was created successfully',
          });
          this._Router.navigate(['/login']);
        },
        error: (err) => {
          this._LoadingService.removeLoading();
          Swal.fire({
            toast: false,
            position: 'center',
            showConfirmButton: true,
            icon: 'error',
            showClass: {
              popup: 'animate__animated animate__bounceInDown',
            },
            hideClass: {
              popup: 'animate__animated animate__bounceOutDown',
            },
            title: `${err.error.message}`,
          });
        },
      });
    }
  }
}