import { Brands, list } from './../../interfaces/brands';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandsService } from 'src/app/services/brands.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent {
  brandList: list[] = [];
  currentPage: number = 1;
  numberOfPages: number = 0;
  pages: number[] = [];

  constructor(
    private _BrandsService: BrandsService,
    private _LoadingService: LoadingService,
    private _Router: Router,
    private _ProductsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this._LoadingService.showLoading();
    this._BrandsService.getAllBrands().subscribe({
      next: (response: Brands) => {
        this.brandList = response.data;
        this.numberOfPages = response.metadata.numberOfPages;
        this.currentPage = response.metadata.currentPage;
        this.paginationMethod(this.numberOfPages);
        this._LoadingService.removeLoading();
      },
      error: (err) => {
        this._LoadingService.removeLoading();
      },
    });
  }

  paginationMethod(pages: number) {
    for (let i = 1; i <= pages; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number) {
    this._LoadingService.showLoading();
    this._BrandsService.page = page;
    this._BrandsService.getAllBrands().subscribe({
      next: (response: Brands) => {
        this.brandList = response.data;
        this.currentPage = response.metadata.currentPage;
        this._LoadingService.removeLoading();
      },
    });
  }

  goToPreviousPage() {
    this._BrandsService.page = --this._BrandsService.page;
    this._LoadingService.showLoading();
    this._BrandsService.getAllBrands().subscribe({
      next: (response: Brands) => {
        this.brandList = response.data;
        this.currentPage = response.metadata.currentPage;
        this._LoadingService.removeLoading();
      },
      error: (err) => {},
    });
  }

  goToNextPage() {
    this._BrandsService.page = ++this._BrandsService.page;
    this._LoadingService.showLoading();
    this._BrandsService.getAllBrands().subscribe({
      next: (response: Brands) => {
        this.brandList = response.data;
        this.currentPage = response.metadata.currentPage;
        this._LoadingService.removeLoading();
      },
      error: (err) => {},
    });
  }

  goToCategory(brandName: string, brandId: string) {
    this._ProductsService.page = 1;
    this._ProductsService.brandName.next(brandName);
    this._ProductsService.brand = brandId;
    this._Router.navigate(['/products']);
  }
}
