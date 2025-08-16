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
import { RouterOutlet } from '@angular/router';
import { ProductsGallery } from './products-gallery/products-gallery';

@Component({
  selector: 'app-home',
  imports: [Header, Catnavigation, RouterOutlet, ProductsGallery],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [Category, CategoriesStoreItem, ProductsStoreItem, ProductsService],
})
export class Home {
  constructor(private categoriesStoreItem: CategoriesStoreItem, private productsStoreItem: ProductsStoreItem) {
    this.categoriesStoreItem.loadCategories();
    this.productsStoreItem.loadProducts();
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
