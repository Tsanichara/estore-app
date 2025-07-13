import { Injectable } from '@angular/core';
import { CategoryType } from '../types/categoryType';
import { categories } from '../sampleData/categories.data';

@Injectable({
  providedIn: 'root'
})
export class Category {

  constructor() { }

  getAllCategories(): CategoryType[]{
    return categories;
  }
}
