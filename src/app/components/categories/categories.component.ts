import { Categories, list } from './../../interfaces/categories';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoriesList: list[] = [];

  constructor(
    private _CategoriesService: CategoriesService,
    private _LoadingService: LoadingService,
    private _Router: Router,
    private _ProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this._LoadingService.showLoading();
    this._CategoriesService.getAllCategories().subscribe({
      next: (response: Categories) => {
        this.categoriesList = response.data;
        this._LoadingService.removeLoading();
      },
      error: (err) => {
        this._LoadingService.removeLoading();
      },
    });
  }

  goToCategory(categoryName: string, categoryId: string) {
    this._ProductsService.page = 1;
    this._ProductsService.category = categoryId;
    this._ProductsService.categoryName.next(categoryName);
    this._Router.navigate(['/products']);
  }
}
