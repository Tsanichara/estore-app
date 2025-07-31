import { Injectable } from '@angular/core';
import { Product } from '../../types/productsType';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProductsList(): Observable<Product[]> {
    return this.http.get<Product[]>('http://localhost:5001/products');
  }
}
