import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {

  constructor(private cartService: CartService) { }

  @Input() cartItem;
  @Output() onItemUpdate = new EventEmitter();

  cart;
  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }


  removeItem() {
   const update = this.formatData(this.cart.items).filter((item) => {
     if (item.product_id !== this.cartItem.product.id) {
       return item;
     }
   });
   this.cartService.updateItems(localStorage.getItem('token'), update).subscribe(data => {
      this.onItemUpdate.emit();
    });
  }

  saveItem() {
    if (this.cartItem.quantity !== null && this.cartItem.quantity !== 0)
    {
      const update = this.formatData(this.cart.items).map((item => {
      if (item.product_id === this.cartItem.product.id) {
        item.quantity = this.cartItem.quantity;
      }
      return item;
    }));
      this.cartService.updateItems(localStorage.getItem('token'), update).subscribe(data => {
      this.onItemUpdate.emit();
    });
    }
  }

  formatData(items) {
    return items.map((cartItem) => {
      return {product_id: cartItem.product.id, quantity: cartItem.quantity};
    });

  }
}
