import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { CategoryType } from '../home/types/categoryType';
import { Category } from '../home/services/category';

@Component({
  selector: 'app-sidenavigation',
  imports: [FontAwesomeModule],
  templateUrl: './sidenavigation.html',
  styleUrl: './sidenavigation.css'
})
export class Sidenavigation {
  faAngleDown = faAngleDown;
  categories: CategoryType[] = [];

  constructor(categoryService: Category){
    this.categories = categoryService.getAllCategories();
  }

  getCategories(parent_category_id?: number): CategoryType[] {
    return this.categories.filter((category) => category.parent_category_id === parent_category_id);
  }

}
