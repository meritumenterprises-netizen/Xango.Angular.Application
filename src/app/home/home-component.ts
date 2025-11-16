import { Component } from '@angular/core';
import { ProductService, Product, ResponseDto } from '../services/ProductService';
import { Observable } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home-component',
  imports: [CurrencyPipe],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
  providers: [ProductService]
})
export class HomeComponent {
  products$: Observable<ResponseDto>;
  response : ResponseDto;
  products: any;

  constructor(public productService: ProductService) {
    this.response = new ResponseDto();
    this.products = [];
    this.products$ = this.productService.getProducts();
    this.products$.subscribe({
      next: responseDto => {
        this.response = responseDto;
      },
      error: err => console.error('Error', err),
      complete: () => {
        console.log('Done');
        this.products  = this.response.result;
      }});
  }

}
