import { Component } from '@angular/core';
import { faTrash, faBoxOpen, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../types/cart.type';
import { Router } from '@angular/router';
import { CartStoreItem } from '../services/cart/cart.storeitem';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Ratings } from "../../ratings/ratings";


@Component({
  selector: 'app-cart',
  imports: [FontAwesomeModule, Ratings],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  faTrash = faTrash;
  faBoxOpen = faBoxOpen;
  faShoppingCart = faShoppingCart;

  constructor(public cartStore: CartStoreItem, private router: Router) {

  }

  navigateToHome(): void {
    this.router.navigate(['home/products'])
  }

  updateQuantity($event: any, cartItem: CartItem): void {
    if($event.target.innerText === '+') {
      this.cartStore.addProduct(cartItem.product);
    } else if($event.target.innerText === '-') {
      this.cartStore.decreaseProductQuantity(cartItem);
    }
  }


  removeItem(cartItem: CartItem): void {
    this.cartStore.removeProduct(cartItem);
  }

}
