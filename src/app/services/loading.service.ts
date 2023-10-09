import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class LoadingService {
  constructor() {}
  isLoading: BehaviorSubject<any> = new BehaviorSubject(false);
  showLoading() {
    this.isLoading.next(true);
  }
  removeLoading() {
    this.isLoading.next(false);
  }
}
