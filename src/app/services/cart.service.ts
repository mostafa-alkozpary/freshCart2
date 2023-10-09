import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl: string = 'https://ecommerce.routemisr.com';
  cartId: string = '';
  numberOfCartItems: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient) {}

  getUserCart(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}/api/v1/cart`);
  }
  addProductToCart(productId: string): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}/api/v1/cart`, {
      productId: productId,
    });
  }

  updateCartQuantity(productId: string, newCount: number): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}/api/v1/cart/${productId}`, {
      count: newCount,
    });
  }

  removeSpecificCartItem(productId: string): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/${productId}`);
  }

  clearUserCart(): Observable<any> {
    return this._HttpClient.delete(`${this.baseUrl}/api/v1/cart/`);
  }

  createCashOrder(addressValue: Object): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/orders/${this.cartId}`,
      { shippingAddress: addressValue }
    );
  }

  onlineGatewayPayment(addressValue: Object): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}/api/v1/orders/checkout-session/${this.cartId}?url=https://ahmedmohamedabdelhamed.github.io/route-fresh-cart-A/#`,
      { shippingAddress: addressValue }
    );
  }
}
