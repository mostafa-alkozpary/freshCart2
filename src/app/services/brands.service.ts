import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  page: number = 1;

  constructor(private _HttpClient: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}/api/v1/brands?limit=20&page=${this.page}`
    );
  }
}
