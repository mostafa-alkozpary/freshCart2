import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllordersService {
  baseUrl: string = 'https://ecommerce.routemisr.com';

  constructor(private _HttpClient: HttpClient) {}

  getAllOrders(cartOwner: string): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}/api/v1/orders/user/${cartOwner}`
    );
  }
}
