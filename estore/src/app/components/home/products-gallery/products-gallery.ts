import { Component } from '@angular/core';
import { Products } from '../../products/products';
import { Sidenavigation } from '../../sidenavigation/sidenavigation';
import { ProductsStoreItem } from '../services/product/products.storeItem';

@Component({
  standalone: true,
  selector: 'app-products-gallery',
  imports: [Products, Sidenavigation],
  templateUrl: './products-gallery.html',
  styleUrl: './products-gallery.css'
})
export class ProductsGallery {
  constructor(private productsStoreItem: ProductsStoreItem) {}

    onSelectSubCategory(subCategoryId: number): void {
    this.productsStoreItem.loadProducts({ subcategoryid: subCategoryId });
  }

  }
