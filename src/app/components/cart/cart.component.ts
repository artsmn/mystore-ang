import { Component, OnInit } from '@angular/core';
import {CartService} from '../../services/cart.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService,
              private router: Router) { }

  cart;
  // buyer;
  orderForm = new FormGroup({
        name: new FormControl('', Validators.required),
        surname: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        address: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.required),
    });

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.cartService.generateCart().subscribe(data => {
        this.cart = data;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        localStorage.setItem('token', this.cart.session_key);
      });
    } else {
      this.updateCart();
    }
  }

  updateCart() {
    this.cartService.getCart(localStorage.getItem('token')).subscribe(data => {
      this.cart = data;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    });
  }

  order() {
    if (this.orderForm.valid) {
      this.cartService.order(localStorage.getItem('token'), this.orderForm.value).subscribe(data => {
        this.router.navigate(['/'], { queryParams: { order: 'true'} });
        localStorage.clear();
      });
    }

  }

}
