import { Component, effect, output, signal } from '@angular/core';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faSearch, faUserCircle, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { CategoriesStoreItem } from '../services/category/categories.storeItem';
import { SearchKeyword } from '../types/searchKeyword.type';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CartStoreItem } from '../services/cart/cart.storeitem';
import { UserService } from '../services/user/userService';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  faSearch = faSearch;
  faUserCircle = faUserCircle;
  
  faShoppingCart = faShoppingCart;

  readonly searchClicked = output<SearchKeyword>();
  displaySearch = signal(true);
  isUserAuthenticated = signal(false);
  userName = signal('');

  constructor(public categoryStore: CategoriesStoreItem, private router: Router, public cart: CartStoreItem, 
    public userService: UserService
  ) {
    this.router.events.pipe(filter((event) =>  event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.displaySearch.set(event.url.startsWith('/home'));
    });

    const isUserAuthenticatedSignal = toSignal(
      this.userService.isUserAuthenticated$,
      { initialValue: false }
    );
    const loggedInUserSignal = toSignal(this.userService.loggedInUser$, {
      initialValue: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        pin: '',
      },
    })

    effect(() => {
      this.isUserAuthenticated.set(isUserAuthenticatedSignal());
      this.userName.set(loggedInUserSignal().firstName);
    })
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

}
