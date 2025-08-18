import { Component, OnInit } from '@angular/core';
import { Products } from '../../products/products';
import { Sidenavigation } from '../../sidenavigation/sidenavigation';
import { ProductsStoreItem } from '../services/product/products.storeItem';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-products-gallery',
  imports: [Products, Sidenavigation],
  templateUrl: './products-gallery.html',
  styleUrl: './products-gallery.css'
})
export class ProductsGallery implements OnInit {
  constructor(private productsStoreItem: ProductsStoreItem, private router: Router) {}

  ngOnInit() {
    // Reload all products when route is hit
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        const currentUrl = this.router.url;
        if (currentUrl === '/home/products') {
          this.productsStoreItem.loadProducts(); // ← reset product filter
        }
      });
  }

    onSelectSubCategory(subCategoryId: number): void {
    this.productsStoreItem.loadProducts({ subcategoryid: subCategoryId });
  }

  resetAllProducts(): void {
  this.productsStoreItem.loadProducts(); // ← No filters
}

  }
