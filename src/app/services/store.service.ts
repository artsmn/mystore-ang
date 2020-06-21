import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

const rootUrl = 'https://apimystore.artsmn.ml';

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  constructor(private http: HttpClient) { }

  getProducts(params) {
    return this.http.get<any>(rootUrl + '/products/', {params});
  }

  getProduct(id) {
    return this.http.get<any>(rootUrl + '/products/' + id + '/');
  }

  getCategories() {
    return this.http.get<any>(rootUrl + '/categories/');
  }
}
