import { Injectable } from '@angular/core';
import { CategoryType } from '../types/categoryType';
import { categories } from '../sampleData/categories.data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Category {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<CategoryType[]>{
    return this.http.get<CategoryType[]>('http://localhost:5001/productCategories');
  }
}
