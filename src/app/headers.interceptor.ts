import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
  userToken: any = localStorage.getItem('userToken');

  constructor(private _AuthenticationService: AuthenticationService) {
    this._AuthenticationService.userToken.subscribe((value) => {
      this.userToken = value;
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.userToken != null) {
      const reqColned = request.clone({
        setHeaders: { token: this.userToken },
      });
      return next.handle(reqColned);
    } else {
      return next.handle(request);
    }
  }
}
