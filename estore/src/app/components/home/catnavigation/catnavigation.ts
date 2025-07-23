import { Component } from '@angular/core';
import { Category } from '../services/category';
import { CategoryType } from '../types/categoryType';

@Component({
  selector: 'app-catnavigation',
  imports: [],
  templateUrl: './catnavigation.html',
  styleUrl: './catnavigation.css'
})
export class Catnavigation {
  categories: CategoryType[] = [];

  constructor(categoryService: Category) {
    categoryService.getAllCategories().subscribe((categories) => (
      this.categories = categories.filter((category) => category.parent_category_id == null)
    ))
  }

}
