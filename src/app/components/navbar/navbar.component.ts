import { ProductsArray, productsList } from './../../interfaces/products';
import { WishList } from 'src/app/interfaces/wishlist';
import { CartDetails } from './../../interfaces/cartdetails';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { WishlistService } from 'src/app/services/wishlist.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = true;
  cartItems: number = 0;
  wishListItems: number = 0;
  products: productsList[] = [];
  showSearch: boolean = false;
  searchValue: string = '';

  constructor(
    private _AuthenticationService: AuthenticationService,
    private _CartService: CartService,
    private _WishlistService: WishlistService,
    private _ProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    this._AuthenticationService.decodingToken();
    this._AuthenticationService.userData.subscribe((value) => {
      if (value) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
    this._CartService.numberOfCartItems.subscribe((value) => {
      this.cartItems = value;
    });

    if (localStorage.getItem('userToken')) {
      this._CartService.getUserCart().subscribe({
        next: (response: CartDetails) => {
          this._CartService.numberOfCartItems.next(response.numOfCartItems);
        },
      });
    }
    this._WishlistService.numberOfWishItems.subscribe((value) => {
      this.wishListItems = value;
    });
    if (localStorage.getItem('userToken')) {
      this._WishlistService.getUserWishList().subscribe({
        next: (response: WishList) => {
          this._WishlistService.numberOfWishItems.next(response.data.length);
        },
        error: (err) => {},
      });
    }
    this._ProductsService.getAllSearchProducts().subscribe({
      next: (response: ProductsArray) => {
        this.products = response.data;
      },
      error: (err) => {},
    });
  }

  logOut() {
    this._AuthenticationService.logOutMethod();
    this._CartService.numberOfCartItems.next(0);
    this._WishlistService.numberOfWishItems.next(0);
  }

  searchquery(ele: any) {
    if (ele.value.length > 0) {
      this.showSearch = true;
      this.searchValue = ele.value;
    } else {
      this.showSearch = false;
    }
  }
}
