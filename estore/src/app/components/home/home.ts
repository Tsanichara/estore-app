import { Component } from '@angular/core';
import { Header } from './header/header';
import { Catnavigation } from './catnavigation/catnavigation';
import { Sidenavigation } from "../sidenavigation/sidenavigation";
import { Products } from "../products/products";
import { Category } from './services/category/category';
import { CategoriesStoreItem } from './services/category/categories.storeItem';
import { ProductsStoreItem } from './services/product/products.storeItem';
import { ProductsService } from './services/product/products-service';

@Component({
  selector: 'app-home',
  imports: [Header, Catnavigation, Sidenavigation, Products],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [Category, CategoriesStoreItem, ProductsStoreItem, ProductsService],
})
export class Home {
  constructor(private categoriesStoreItem: CategoriesStoreItem, private productsStoreItem: ProductsStoreItem) {
    this.categoriesStoreItem.loadCategories();
    this.productsStoreItem.loadProducts();
  }

  onSelectSubCategory(subCategoryId: number): void {
    this.productsStoreItem.loadProducts({ subcategoryid: subCategoryId });
  }

  onSelectCategory(mainCategoryId: number): void {
    this.productsStoreItem.loadProducts({ maincategoryid: mainCategoryId });
  }
}
