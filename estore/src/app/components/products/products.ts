import { Component } from '@angular/core';
import { ProductsService } from '../home/services/product/products-service';
import { Product } from '../home/types/productsType';
import { CommonModule } from '@angular/common';
import { Ratings } from "../ratings/ratings";
import { ProductsStoreItem } from '../home/services/product/products.storeItem';

@Component({
  selector: 'app-products',
  imports: [Ratings],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  

  constructor(public productsStoreItem: ProductsStoreItem) {
    
  }

}
