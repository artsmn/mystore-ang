import { Component, OnInit } from '@angular/core';
import {StoreService} from '../../services/store.service';
import {HttpParams} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { filter } from 'rxjs/operators';
import {CartService} from '../../services/cart.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private storeService: StoreService,
              private cartService: CartService,
              private route: ActivatedRoute) {
  }

  products;
  categories;
  pickedCategory;
  cart;
  ordered = false;
  ngOnInit(): void {
    let category = localStorage.getItem('category');
    if (!category) {
      category = '0';
    }
    this.loadProductsByCategory(category);
    this.pickedCategory = category;

    this.route.queryParams.pipe(filter(params => params.order))
      .subscribe(params => {
        if (params.order === 'true') {
          this.ordered = true;
        }
      });

    this.storeService.getCategories().subscribe(data => {
      this.categories = data;
    });

    if (!localStorage.getItem('token')) {
      this.cartService.generateCart().subscribe(data => {
        this.cart = data;
        localStorage.setItem('cart', JSON.stringify(this.cart));
        localStorage.setItem('token', this.cart.session_key);
      });
    } else {
      this.cartService.getCart(localStorage.getItem('token')).subscribe(data => {
      this.cart = data;
      localStorage.setItem('cart', JSON.stringify(this.cart));
    });
    }
  }


  categorySelect(value) {
    this.loadProductsByCategory(value);
    localStorage.setItem('category', value);
  }

  loadProductsByCategory(categoryId){
    if (categoryId === '0' || categoryId === 0)
    {
      const params = new HttpParams();
      this.storeService.getProducts(params).subscribe(data => {
      this.products = data;
    });
    } else {
      const params = new HttpParams().set('category', categoryId.toString());
      this.storeService.getProducts(params).subscribe(data => {
      this.products = data;
      });
    }
  }

}
