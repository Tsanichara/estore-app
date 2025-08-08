import { Component, output } from '@angular/core';

import { CategoryType } from '../types/categoryType';
import { CategoriesStoreItem } from '../services/category/categories.storeItem';

@Component({
  selector: 'app-catnavigation',
  imports: [],
  templateUrl: './catnavigation.html',
  styleUrl: './catnavigation.css'
})
export class Catnavigation {
  readonly categoryClicked = output<number>();
  constructor(public categoryStore: CategoriesStoreItem) {

  }

   onCategoryClick(mainCategory: CategoryType) {
      this.categoryClicked.emit(mainCategory.id);
    }

}
