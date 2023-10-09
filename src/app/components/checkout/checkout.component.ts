import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartDetails } from 'src/app/interfaces/cartdetails';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(private _CartService: CartService, private _Router: Router) {}

  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next: (response: CartDetails) => {
        this._CartService.cartId = response.data._id;
      },
      error: (err) => {},
    });
  }

  checkOutForm: FormGroup = new FormGroup({
    address: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[1250][0-9]{8}$/),
    ]),
    city: new FormControl(null, [Validators.required, Validators.minLength(3)]),
  });

  handleOfflinePay(form: FormGroup) {
    if (form.valid) {
      this._CartService.createCashOrder(form.value).subscribe({
        next: (response) => {
          this._Router.navigate(['/allorders']);
        },
        error: (err) => {},
      });
    }
  }

  handleOnlinePay(form: FormGroup) {
    if (form.valid) {
      this._CartService.onlineGatewayPayment(form.value).subscribe({
        next: (response) => {
          window.location = response.session.url;
        },
        error: (err) => {},
      });
    }
  }
}
