import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home.component.media.css'],
})
export class HomeComponent implements OnInit {
  categoriesList: any[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: true,
  };

  customOptions2: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplaySpeed: 500,
    navText: ['', ''],
    responsive: {
      0: {
          items: 1,
      },
      400: {
          items: 2,
      },
      740: {
          items: 3,
      },
      940: {
          items: 6,
      },
    },
    nav: true,
  };

  constructor(private _CategoriesService: CategoriesService) {}

  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next: (response) => {
        this.categoriesList = response.data;
      },
      error: (err) => {},
    });
  }
}
