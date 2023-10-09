import { Pipe, PipeTransform } from '@angular/core';
import { productsList } from './interfaces/products';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(products: productsList[], param: string): productsList[] {
    return products.filter((product) => {
      return product.title.toLowerCase().includes(param.toLowerCase());
    });
  }
}
