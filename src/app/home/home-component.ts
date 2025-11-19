import { Component } from '@angular/core';
import { ProductService, Product } from '../services/ProductService';
import { Observable } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { ResponseDto } from '../services/ResponseDto';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private productService: ProductService, private toastr : ToastrService) {
    this.response = new ResponseDto();
    this.products = [];
    this.products$ = this.productService.getProducts();
    this.products$.subscribe({
      next: responseDto => {
        this.response = responseDto;
      },
      error: err => {
        console.error('Error', err);
        toastr.error(err, "Error");
      },
      complete: () => {
        console.log('Done');
        this.products  = this.response.result;
      }});
  }

}
