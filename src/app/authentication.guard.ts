import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

export const authenticationGuard: CanActivateFn = (route, state) => {
  let navigation = inject(Router);
  let decodedUserToken = null;
  if (localStorage.getItem('userToken')) {
    let encodeduserToken = JSON.stringify(localStorage.getItem('userToken'));
    try {
      decodedUserToken = jwt_decode(encodeduserToken);
    } catch (error) {}
  }
  if (decodedUserToken) {
    return true;
  } else {
    navigation.navigate(['/login']);
    return false;
  }
};
