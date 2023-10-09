import { Component, OnInit } from '@angular/core';
import { CartDetails, ProductElement } from 'src/app/interfaces/cartdetails';
import { CartService } from 'src/app/services/cart.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartDetails: CartDetails | null = null;
  cartProductsArray: ProductElement[] | null = null;

  constructor(
    private _CartService: CartService,
    private _LoadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getAllCartProducts();
  }

  getAllCartProducts() {
    this._LoadingService.showLoading();
    this._CartService.getUserCart().subscribe({
      next: (response: CartDetails) => {
        this._CartService.cartId = response.data._id;
        this.cartDetails = response;
        this.cartProductsArray = response.data.products;
        this._LoadingService.removeLoading();
      },
      error: (err) => {
        console.log(err);

        this._LoadingService.removeLoading();
      },
    });
  }

  deleteProduct(productId: string) {
    this._LoadingService.showLoading();
    this._CartService.removeSpecificCartItem(productId).subscribe({
      next: (response: CartDetails) => {
        this._CartService.numberOfCartItems.next(response.numOfCartItems);
        if (response.numOfCartItems === 0) {
          this.deleteAllCart();
        } else {
          this.cartDetails = response;
          this.cartProductsArray = response.data.products;
          this._LoadingService.removeLoading();
        }
      },
      error: (err) => {
        this._LoadingService.removeLoading();
      },
    });
  }

  updateProductQuantity(productId: string, count: number) {
    this._LoadingService.showLoading();
    this._CartService.updateCartQuantity(productId, count).subscribe({
      next: (response: CartDetails) => {
        this._CartService.numberOfCartItems.next(response.numOfCartItems);
        this.cartDetails = response;
        this.cartProductsArray = response.data.products;
        this._LoadingService.removeLoading();
      },
      error: (err) => {
        console.log(err);
        this._LoadingService.removeLoading();
      },
    });
  }

  increaseProductQuantity(productId: string, count: number) {
    this.updateProductQuantity(productId, ++count);
  }

  decreaseProductQuantity(productId: string, count: number) {
    if (--count === 0) {
      this.deleteProduct(productId);
    } else {
      this.updateProductQuantity(productId, --count);
    }
  }

  deleteAllCart() {
    this._LoadingService.showLoading();
    this._CartService.clearUserCart().subscribe({
      next: () => {
        this._CartService.numberOfCartItems.next(0);
        this.cartDetails = null;
        this._LoadingService.removeLoading();
      },
      error: (err) => {
        this._LoadingService.removeLoading();
      },
    });
  }
}
