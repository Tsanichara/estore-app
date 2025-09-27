import {
  Component,
  effect,
  inject,
  signal,
  WritableSignal,
  PLATFORM_ID,
} from '@angular/core';
import {
  faTrash,
  faBoxOpen,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import { CartItem } from '../types/cart.type';
import { ActivatedRoute, Router } from '@angular/router';
import { CartStoreItem } from '../services/cart/cart.storeitem';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Ratings } from '../../ratings/ratings';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoggedInUser } from '../types/user.type';
import { UserService } from '../services/user/userService';
import { OrderService } from '../services/order/order-service';
import { NgClass, isPlatformBrowser } from '@angular/common';
import { StripeService } from '../services/stripe/stripe-service';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FontAwesomeModule, Ratings, ReactiveFormsModule, NgClass],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  faTrash = faTrash;
  faBoxOpen = faBoxOpen;
  faShoppingCart = faShoppingCart;

  alertType: number = 0;
  alertMessage: string = '';
  disableCheckout: boolean = false;
  paymentSuccess = signal(false);

  user = signal<LoggedInUser>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    pin: '',
    email: '',
  });

  orderForm: WritableSignal<FormGroup>;

  private platformId = inject(PLATFORM_ID);

  constructor(
    public cartStore: CartStoreItem,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private orderService: OrderService,
    private stripeService: StripeService,
    private route: ActivatedRoute
  ) {
    this.orderForm = signal(this.createOrderForm(this.user()));

    effect(() => {
      const newUser = this.user();
      this.orderForm.set(this.createOrderForm(newUser));
    });

    this.route.queryParams.pipe(switchMap((params) => {
  if (params['status'] === 'success' && !this.paymentSuccess()) {
    this.paymentSuccess.set(true);

    const storedFormData = localStorage.getItem('orderFormData');
    if (storedFormData) {
      try {
        const formData = JSON.parse(storedFormData);
        // WAIT to patch until user is set
        return this.userService.loggedInUser$.pipe(
          switchMap((user) => {
            this.user.set(user);
            this.orderForm().patchValue(formData);
            localStorage.removeItem('orderFormData');
            return of(user);
          })
        );
      } catch (error) {
        console.error('Error parsing stored form data: ', error);
        this.alertType = 2;
        this.alertMessage = 'Failed to restore your address. Please retry.';
        return of(null);
      }
    }

    return this.userService.loggedInUser$;
  } else if (params['status'] === 'cancel') {
    this.alertMessage = 'Payment was canceled.';
    this.alertType = 2;
    return of(null);
  } else {
    return of(null);
  }
})).subscribe((user) => {
  if (user && this.paymentSuccess()) {
    // Now the form is patched AND the user is set
    this.saveOrder();
  }
});


    this.userService.loggedInUser$.subscribe((u) => this.user.set(u));
  }

  private createOrderForm(user: LoggedInUser | null): FormGroup {
    return this.fb.group({
      name: [
        user?.firstName && user?.lastName
          ? `${user.firstName} ${user.lastName}`.trim()
          : '',
        Validators.required,
      ],
      address: [user?.address || '', Validators.required],
      city: [user?.city || '', Validators.required],
      state: [user?.state || '', Validators.required],
      pin: [user?.pin || '', Validators.required],
    });
  }

  navigateToHome(): void {
    this.router.navigate(['home/products']);
  }

  updateQuantity($event: any, cartItem: CartItem): void {
    if ($event.target.innerText === '+') {
      this.cartStore.addProduct(cartItem.product);
    } else if ($event.target.innerText === '-') {
      this.cartStore.decreaseProductQuantity(cartItem);
    }
  }

  removeItem(cartItem: CartItem): void {
    this.cartStore.removeProduct(cartItem);
  }

  checkout(): void {
    if (!this.userService.isAuthenticated()) {
      this.alertType = 2;
      this.alertMessage = 'Please log in to proceed with payment.';
      return;
    }

    if (
      this.cartStore.cart().products.length > 0 &&
      this.orderForm().valid
    ) {
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(
          'orderFormData',
          JSON.stringify(this.orderForm().value)
        );
      }

      this.stripeService.redirectToCheckout(
        this.cartStore.cart().products
      );
    } else {
      this.alertType = 2;
      this.alertMessage = 'Please fill in the delivery address to continue';
    }
  }

  private saveOrder(): void {
    if (!this.userService.isUserAuthenticated) {
      this.alertType = 2;
      this.alertMessage = 'Please log in to register your order.';
      return;
    }

    const form = this.orderForm();

    if (form.invalid) {
      this.alertType = 2;
      this.alertMessage =
        'Please fill out all required fields correctly.';
      return;
    }

    const deliveryAddress = {
      userName: form.get('name')?.value,
      address: form.get('address')?.value,
      city: form.get('city')?.value,
      state: form.get('state')?.value,
      pin: form.get('pin')?.value,
    };

    const email = this.user()?.email;

    if (!email) {
      this.alertType = 2;
      this.alertMessage =
        'User email not found. Please log in again.';
      return;
    }

    this.orderService.saveOrder(deliveryAddress, email).subscribe({
      next: () => {
        this.cartStore.clearCart();
        this.alertType = 0;
        this.alertMessage = 'Order registered successfully!';
        this.disableCheckout = true;
      },
      error: (error) => {
        this.alertType = 2;
        if (error.error?.message === 'Authorization failed!') {
          this.alertMessage = 'Please log in to register your order.';
        } else {
          this.alertMessage =
            error.error?.message || 'An unexpected error occurred.';
        }
      },
    });
  }
}
