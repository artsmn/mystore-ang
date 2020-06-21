import {Component, Input, OnInit} from '@angular/core';
import { StoreService } from '../../services/store.service';
import {CartService} from '../../services/cart.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {

  constructor(private storeService: StoreService,
              private cartService: CartService,
              private router: Router) { }

  @Input() product;
  cart;
  inCart;

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    if (this.cart) {
      if (this.cart.items.find(item => item.product.id === this.product.id)) {
          this.inCart = true;
        }
    }
  }

  addToCart() {
    const update = this.cart.items.map((item) => {
      return {product_id: item.product.id, quantity: item.quantity};
    });
    update.push({product_id: this.product.id, quantity: 1});
    this.cartService.updateItems(localStorage.getItem('token'), update).subscribe((data) => {
      this.router.navigateByUrl('/cart');
    });
  }

}
