import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const rootUrl = 'https://apimystore.artsmn.ml';
// const rootUrl = 'http://127.0.0.1:8000';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  generateCart() {
    return this.http.post(rootUrl + '/carts/', null);
  }

  getCart(key) {
    return this.http.get(rootUrl + '/carts/', {headers: new HttpHeaders({'session-key': key})});
  }

  updateItems(key, items) {
    return this.http.post(rootUrl + '/carts/update_items/', items, {headers: new HttpHeaders({'session-key': key})});
  }

  order(key, data) {
    return this.http.post(rootUrl + '/orders/', data, {headers: new HttpHeaders({'session-key': key})});
  }
}
