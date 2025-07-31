import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { CategoryType } from '../home/types/categoryType';
import { Category } from '../home/services/category/category';
import { CategoriesStoreItem } from '../home/services/category/categories.storeItem';

@Component({
  selector: 'app-sidenavigation',
  imports: [FontAwesomeModule],
  templateUrl: './sidenavigation.html',
  styleUrl: './sidenavigation.css'
})
export class Sidenavigation {
  faAngleDown = faAngleDown;
  
  private categoryStore = inject(CategoriesStoreItem);

  readonly categories = this.categoryStore.categories;

  getCategories(parent_category_id?: number): CategoryType[] {
    return this.categories().filter((category) => 
      parent_category_id? 
      category.parent_category_id === parent_category_id : category.parent_category_id === null);
  }

}
