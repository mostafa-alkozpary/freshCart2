import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  limit: number = 40;
  sort: string = '+price';
  minPrice: number = 100;
  page: number = 1;
  maxPrice: number = 50000;
  category: string = '';
  brand: string = '';
  categoryName: BehaviorSubject<any> = new BehaviorSubject(null);
  brandName: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient) {}

  searchGetAllProducts(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products?limit=1000`);
  }

  getAllSearchProducts(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products?limit=1000`);
  }

  getAllProducts(): Observable<any> {
    if (this.category && this.brand) {
      return this._HttpClient.get(
        `${this.baseUrl}/api/v1/products?limit=${this.limit}&sort=${this.sort}&price[gte]=${this.minPrice}&page=${this.page}&brand=${this.brand}&price[lte]=${this.maxPrice}&category[in]=${this.category}`
      );
    } else if (this.brand) {
      return this._HttpClient.get(
        `${this.baseUrl}/api/v1/products?limit=${this.limit}&sort=${this.sort}&price[gte]=${this.minPrice}&page=${this.page}&brand=${this.brand}&price[lte]=${this.maxPrice}`
      );
    } else if (this.category) {
      return this._HttpClient.get(
        `${this.baseUrl}/api/v1/products?limit=${this.limit}&sort=${this.sort}&price[gte]=${this.minPrice}&page=${this.page}&price[lte]=${this.maxPrice}&category[in]=${this.category}`
      );
    } else {
      return this._HttpClient.get(
        `${this.baseUrl}/api/v1/products?limit=${this.limit}&sort=${this.sort}&price[gte]=${this.minPrice}&page=${this.page}&price[lte]=${this.maxPrice}`
      );
    }
  }

  getSpecificProduct(id: string): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/products/${id}`);
  }
}
