import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
declare let $: any;

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})

export class LoadingComponent implements OnInit {
  constructor(private _LoadingService: LoadingService) {}
  ngOnInit(): void {
    $('.loading-container').fadeOut(0);
    this._LoadingService.isLoading.subscribe({
      next: (value) => {
        if (value) {
          $('.loading-container').fadeIn(0);
        } else {
          $('.loading-container').fadeOut(1000);
        }
      },
    });
  }
}