import { Injectable } from '@angular/core';
import { ProductListItem } from './productsType';
import { products } from './productsData';

@Injectable()
export class ProductsService {

  constructor() { }

  getProductsList(): ProductListItem[] {
    return products;
  }
}
