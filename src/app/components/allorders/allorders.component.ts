import { AllOrders } from './../../interfaces/allorders';
import { CartDetails } from 'src/app/interfaces/cartdetails';
import { Component, OnInit } from '@angular/core';
import { AllordersService } from 'src/app/services/allorders.service';
import { CartService } from 'src/app/services/cart.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css'],
})
export class AllordersComponent implements OnInit {
  allOrders: AllOrders[] = [];
  cartOwnerId: string = '';

  constructor(
    private _CartService: CartService,
    private _AllordersService: AllordersService,
    private _LoadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this._LoadingService.showLoading();
    this._CartService.getUserCart().subscribe({
      next: (response: CartDetails) => {
        this.cartOwnerId = response.data.cartOwner;
        this.getAllOrders(this.cartOwnerId);
      },
      error: (err) => {
        const inputString = err.error.message;
        const regex = /user:\s(\w+)/;
        const match = inputString.match(regex);
        const userId = match![1];
        this.cartOwnerId = userId;
        this.getAllOrders(this.cartOwnerId);
        this._CartService.numberOfCartItems.next(0);
      },
    });
  }

  getAllOrders(cartOwnerId: string) {
    this._AllordersService.getAllOrders(cartOwnerId).subscribe({
      next: (response: AllOrders[]) => {
        this.allOrders = response;
        this._LoadingService.removeLoading();
      },
      error: (err) => {},
    });
  }
}
