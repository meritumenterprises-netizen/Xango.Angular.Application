import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService, Product } from '../../services/ProductService';
import { AuthService } from '../../services/AuthenticationService';
import { ResponseDto } from '../../services/ResponseDto';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-product-component',
  imports: [CurrencyPipe],
  templateUrl: './product-component.html',
  styleUrl: './product-component.css',
  providers: [ProductService]
})
export class ProductComponent {
    products$: Observable<ResponseDto> | any = null;
    response : ResponseDto | any = null;
    products: Product[] | any;
  
  constructor(private productService: ProductService, private toastr : ToastrService) {
    this.response = new ResponseDto();
    this.products = [];
    this.products$ = this.productService.getProducts();
    this.products$.subscribe({
      next: (responseDto: any) => {
        this.response = responseDto;
      },
      error: (err: string | undefined) => {
        console.error('Error', err);
        toastr.error(err, "Error");
      },
      complete: () => {
        console.log('Done');
        this.products  = this.response.result;
      }});
  }

}
