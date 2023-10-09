import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  userData: BehaviorSubject<any> = new BehaviorSubject(null);
  userToken: BehaviorSubject<any> = new BehaviorSubject(
    localStorage.getItem('userToken')
  );

  constructor(
    private _HttpClient: HttpClient,
    private _Router: Router,
    private _ProductsService: ProductsService
  ) {
    if (localStorage.getItem('userToken')) {
      this.userData.next(localStorage.getItem('userToken'));
    }
  }

  decodingToken() {
    if (localStorage.getItem('userToken')) {
      let encodedUserToken = JSON.stringify(localStorage.getItem('userToken'));
      let decodedUserToken = jwt_decode(encodedUserToken);
      this.userData.next(decodedUserToken);
    }
  }
  registerMethod(userData: {}): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/auth/signup`,
      userData
    );
  }
  logInMethod(userData: {}): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/auth/signin`,
      userData
    );
  }
  logOutMethod() {
    localStorage.removeItem('userToken');
    this.userData.next(null);
    this._ProductsService.page = 1;
    this._Router.navigate(['/login']);
  }

  forgotPasswordMethod(email: string): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/auth/forgotPasswords`,
      email
    );
  }
  verifyResetCodeMethod(code: string): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/auth/verifyResetCode`,
      code
    );
  }
  resetPasswordMethod(newPassword: string): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}/api/v1/auth/resetPassword`,
      newPassword
    );
  }
}
