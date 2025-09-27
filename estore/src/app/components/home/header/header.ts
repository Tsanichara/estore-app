import {
  Component,
  effect,
  signal,
  output,
  inject,
  ApplicationRef,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faUserCircle,
  faShoppingCart,
  faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { CategoriesStoreItem } from '../services/category/categories.storeItem';
import { SearchKeyword } from '../types/searchKeyword.type';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CartStoreItem } from '../services/cart/cart.storeitem';
import { UserService } from '../services/user/userService';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  faSearch = faSearch;
  faUserCircle = faUserCircle;
  faChevronDown = faChevronDown;
  faShoppingCart = faShoppingCart;

  dropdownVisible = false;
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  readonly searchClicked = output<SearchKeyword>();

  displaySearch = signal(true);
  isUserAuthenticated = signal(false);
  userName = signal('');

  constructor(
    public categoryStore: CategoriesStoreItem,
    private router: Router,
    public cart: CartStoreItem,
    public userService: UserService
  ) {
    // Update displaySearch for router-based visibility
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.displaySearch.set(event.url.startsWith('/home'));

        // Refresh auth state on route changes
        this.isUserAuthenticated.set(this.userService.isUserAuthenticated);
        this.userName.set(this.userService.LoggedInUser.firstName);
      });

    // Signals converted from observables
    const isAuthSignal = toSignal(this.userService.isUserAuthenticated$, {
      initialValue: false,
    });

    const loggedInUserSignal = toSignal(this.userService.loggedInUser$, {
      initialValue: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        pin: '',
        email: '',
      },
    });

    // Reactive signal update
    effect(() => {
      this.isUserAuthenticated.set(isAuthSignal());
      this.userName.set(loggedInUserSignal().firstName);
    });

    // Force sync again after SSR hydration
    inject(ApplicationRef).isStable.subscribe((stable) => {
      if (stable) {
        this.isUserAuthenticated.set(this.userService.isUserAuthenticated);
        this.userName.set(this.userService.LoggedInUser.firstName);
      }
    });
  }

  onClickSearch(keyword: string, categoryId: string): void {
    this.searchClicked.emit({
      categoryId: parseInt(categoryId),
      keyword: keyword,
    });
  }

  navigateToCart(): void {
    this.router.navigate(['home/cart']);
  }

  logout(): void {
    this.userService.logout();
  }

  pastOrders(): void {
    this.router.navigate(['home/pastorders']);
  }
}
