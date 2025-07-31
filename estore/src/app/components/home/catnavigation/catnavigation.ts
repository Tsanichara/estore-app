import { Component } from '@angular/core';
import { Category } from '../services/category/category';
import { CategoryType } from '../types/categoryType';
import { CategoriesStoreItem } from '../services/category/categories.storeItem';

@Component({
  selector: 'app-catnavigation',
  imports: [],
  templateUrl: './catnavigation.html',
  styleUrl: './catnavigation.css'
})
export class Catnavigation {
  constructor(public categoryStore: CategoriesStoreItem) {

  }

}
