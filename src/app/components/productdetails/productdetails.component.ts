import { ProductDetails, product } from './../../interfaces/productdetails';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartDetails } from 'src/app/interfaces/cartdetails';
import { CartService } from 'src/app/services/cart.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductsService } from 'src/app/services/products.service';
import { WishlistService } from 'src/app/services/wishlist.service';
declare let Swal: any;

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent implements OnInit {
  params: string = '';
  productDetails: product | null = null;
  displayedImage: string = '';
  isLoading: boolean = false;
  isWishLoading: boolean = false;

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductsService: ProductsService,
    private _LoadingService: LoadingService,
    private _CartService: CartService,
    private _WishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((value) => {
      this.params = value['id'];
      this.getSpecificProduct(this.params);
    });
  }

  getSpecificProduct(id: string) {
    this._LoadingService.showLoading();
    this._ProductsService.getSpecificProduct(id).subscribe({
      next: (response: ProductDetails) => {
        this.productDetails = response.data;
        this.displayedImage = this.productDetails.images[0];
        this._LoadingService.removeLoading();
      },
      error: (err) => {
        this._LoadingService.removeLoading();
      },
    });
  }

  changeDisplayedImage(par: any) {
    this.displayedImage = par.getAttribute('src');
  }

  addToCart(productId: string) {
    this.isLoading = true;
    this._CartService.addProductToCart(productId).subscribe({
      next: (response: CartDetails) => {
        this._CartService.numberOfCartItems.next(response.numOfCartItems);
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'success',
          customClass: {
            timerProgressBar: 'progress-bar',
          },
          showClass: {
            popup: 'animate__animated animate__fadeInRightBig',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutRightBig',
          },
          title: `Product added to your cart`,
        });
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      },
    });
  }

  addToWishList(name: string, productId: string) {
    this.isWishLoading = true;
    this._WishlistService.addToWishList(productId).subscribe({
      next: (response) => {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
          icon: 'success',
          customClass: {
            timerProgressBar: 'progress-bar',
          },
          showClass: {
            popup: 'animate__animated animate__fadeInRightBig',
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutRightBig',
          },
          html: `<div>${name
            .split(' ')
            .splice(0, 2)
            .join(
              ' '
            )} added to your wishlist</div> <i class="fa-solid text-danger fa-heart"></i>`,
        });
        this._WishlistService.checkWishListItems();
        this.isWishLoading = false;
      },
      error: (err) => {
        this.isWishLoading = false;
      },
    });
  }
}
