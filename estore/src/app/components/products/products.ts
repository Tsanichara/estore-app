import { Component } from '@angular/core';
import { ProductsService } from '../home/services/product/products-service';
import { Product } from '../home/types/productsType';
import { Ratings } from "../ratings/ratings";
import { ProductsStoreItem } from '../home/services/product/products.storeItem';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartStoreItem } from '../home/services/cart/cart.storeitem';

@Component({
  selector: 'app-products',
  imports: [Ratings, FontAwesomeModule, RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  faBoxOpen = faBoxOpen;
  faShoppingCart = faShoppingCart;

  constructor(public productsStoreItem: ProductsStoreItem, private cart: CartStoreItem) {
    
  }

  addToCart(product: Product) {
    this.cart.addProduct(product);
  }

}
