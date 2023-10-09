import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { WishList } from 'src/app/interfaces/wishlist';
import { CartDetails } from 'src/app/interfaces/cartdetails';

declare let $: any;
declare let Swal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide: boolean = true;

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _Router: Router,
    private _LoadingService: LoadingService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  logInForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(?=[A-Z])(?=(?:[^0-9]*[0-9]){2}).{6,}$/),
    ]),
  });

  handleLogin(form: FormGroup) {
    if (form.valid) {
      this._LoadingService.showLoading();
      this._AuthenticationService.logInMethod(form.value).subscribe({
        next: (response) => {
          this._LoadingService.removeLoading();
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 2000,
            customClass: {
              timerProgressBar: 'progress-bar',
            },
            showClass: {
              popup: 'animate__animated animate__fadeInRightBig',
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutRightBig',
            },
            title: `Welcome back ${response.user.name}`,
          });
          localStorage.setItem('userToken', response.token);
          this._AuthenticationService.userToken.next(response.token);
          this._CartService.getUserCart().subscribe({
            next: (response: CartDetails) => {
              this._CartService.numberOfCartItems.next(response.numOfCartItems);
            },
          });
          this._WishlistService.getUserWishList().subscribe({
            next: (response: WishList) => {
              this._WishlistService.numberOfWishItems.next(
                response.data.length
              );
            },
            error: (err) => {},
          });
          this._AuthenticationService.decodingToken();
          this._Router.navigate(['/home']);
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
