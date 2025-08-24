import { Component } from '@angular/core';
import { faTrash, faBoxOpen, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../types/cart.type';
import { Router } from '@angular/router';
import { CartStoreItem } from '../services/cart/cart.storeitem';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@Component({
  selector: 'app-cart',
  imports: [FontAwesomeModule],
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

}
