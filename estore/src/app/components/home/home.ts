import { Component } from '@angular/core';
import { Header } from './header/header';
import { Catnavigation } from './catnavigation/catnavigation';
import { Sidenavigation } from "../sidenavigation/sidenavigation";
import { Products } from "../products/products";
import { Category } from './services/category/category';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductsStoreItem } from './services/product/products.storeItem';
import { ProductsService } from './services/product/products-service';
import { SearchKeyword } from './types/searchKeyword.type';
import { Router, RouterOutlet } from '@angular/router';
import { ProductsGallery } from './products-gallery/products-gallery';
import { CartStoreItem } from './services/cart/cart.storeitem';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { UserService } from './services/user/userService';
import { OrderService } from './services/order/order-service';

@Component({
  selector: 'app-home',
  imports: [Header, Catnavigation, RouterOutlet],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [Category, CategoriesStoreItem, ProductsStoreItem, ProductsService, CartStoreItem, UserService, OrderService],
})
export class Home {
  constructor(private categoriesStoreItem: CategoriesStoreItem, private productsStoreItem: ProductsStoreItem,
    private router: Router
  ) {
    this.categoriesStoreItem.loadCategories();
    this.productsStoreItem.loadProducts();

    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      if((event as NavigationEnd).url === '/home'){
        router.navigate(['/home/products'])
      }
    });
  }


  onSelectCategory(mainCategoryId: number): void {
    this.productsStoreItem.loadProducts({ maincategoryid: mainCategoryId });
  }


  onSearchKeyword(searchKeyword: SearchKeyword): void {
    this.productsStoreItem.loadProducts({
      maincategoryid: searchKeyword.categoryId,
      keyword: searchKeyword.keyword,
    })
  }

}
