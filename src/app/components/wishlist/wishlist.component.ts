import { CartDetails } from './../../interfaces/cartdetails';
import { WishList, product } from './../../interfaces/wishlist';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LoadingService } from 'src/app/services/loading.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  products: product[] = [];

  constructor(
    private _WishlistService: WishlistService,
    private _LoadingService: LoadingService,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {
    this.getUserWishList();
  }

  getUserWishList() {
    this._LoadingService.showLoading();
    this._WishlistService.getUserWishList().subscribe({
      next: (response: WishList) => {
        this.products = response.data;
        this._LoadingService.removeLoading();
      },
      error: (err) => {
        this._LoadingService.removeLoading();
      },
    });
  }

  deleteProductFromWishList(productId: string) {
    this._LoadingService.showLoading();
    this._WishlistService.removeFromWishList(productId).subscribe({
      next: (response: WishList) => {
        this._WishlistService.numberOfWishItems.next(response.data.length);
        this.getUserWishList();
      },
      error: (err) => {
        this._LoadingService.removeLoading();
      },
    });
  }

  addProductToCart(productId: string) {
    this._LoadingService.showLoading();
    this._CartService.addProductToCart(productId).subscribe({
      next: (response: CartDetails) => {
        this._CartService.numberOfCartItems.next(response.numOfCartItems);
        this.deleteProductFromWishList(productId);
      },
      error: (err) => {
        this._LoadingService.removeLoading();
      },
    });
  }
}
