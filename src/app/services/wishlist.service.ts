import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  
  baseUrl: string = 'https://ecommerce.routemisr.com';
  numberOfWishItems: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient) {}

  getUserWishList(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/wishlist`);
  }

  addToWishList(productId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/wishlist`, {
      productId: productId,
    });
  }

  removeFromWishList(productId: string): Observable<any> {
    return this._HttpClient.delete(
      `${this.baseUrl}/api/v1/wishlist/${productId}`
    );
  }

  checkWishListItems() {
    this.getUserWishList().subscribe({
      next: (response) => {
        this.numberOfWishItems.next(response.data.length);
      },
    });
  }
}
