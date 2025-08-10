import { Component } from '@angular/core';
import { ProductsService } from '../home/services/product/products-service';
import { Product } from '../home/types/productsType';
import { CommonModule } from '@angular/common';
import { Ratings } from "../ratings/ratings";
import { ProductsStoreItem } from '../home/services/product/products.storeItem';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  imports: [Ratings, FontAwesomeModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  faBoxOpen = faBoxOpen;

  constructor(public productsStoreItem: ProductsStoreItem) {
    
  }

}
