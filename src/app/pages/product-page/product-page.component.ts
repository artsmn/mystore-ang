import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StoreService} from '../../services/store.service';
import {mergeMap, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              private router: Router,
              private storeService: StoreService) {}

  private destroy$: Subject<void> = new Subject<void>();
  product;
  cart;
  inCart;

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.route.params
      .pipe(
        mergeMap(params => this.storeService.getProduct(params.id)),
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        this.product = data;
        if (this.cart.items.find(item => item.product.id === this.product.id)) {
          this.inCart = true;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
