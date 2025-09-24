import { Component, effect, signal, WritableSignal } from '@angular/core';
import { faTrash, faBoxOpen, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../types/cart.type';
import { Router } from '@angular/router';
import { CartStoreItem } from '../services/cart/cart.storeitem';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Ratings } from "../../ratings/ratings";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoggedInUser } from '../types/user.type';
import { UserService } from '../services/user/userService';


@Component({
  selector: 'app-cart',
  imports: [FontAwesomeModule, Ratings, ReactiveFormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  faTrash = faTrash;
  faBoxOpen = faBoxOpen;
  faShoppingCart = faShoppingCart;

  user = signal<LoggedInUser>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pin: '',
  })

  orderForm: WritableSignal<FormGroup>;

  constructor(public cartStore: CartStoreItem, private router: Router, private userService: UserService, private fb: FormBuilder) {
    this.orderForm = signal(this.createOrderForm(this.user()));
    this.userService.loggedInUser$.subscribe((u) => this.user.set(u));

    effect(() => {
      const newUser = this.user();
      this.orderForm.set(this.createOrderForm(newUser));
    })
  }

  private createOrderForm(user: LoggedInUser | null): FormGroup {
    return this.fb.group({
      name: [
        user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}`.trim() : '',
        Validators.required,
      ],
      address: [user?.address || '', Validators.required],
      city: [user?.city || '', Validators.required],
      state: [user?.state || '', Validators.required],
      pin: [user?.pin || '', Validators.required],
    })
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

  onSubmit(): void {
    if (this.orderForm().valid){
      console.log('Order submitted: ', this.orderForm().value);
    } else {
      console.log('Invalid order form');
    }
  }
}
