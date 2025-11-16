import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductService, ResponseDto } from '../../services/ProductService';
import { Observable } from 'rxjs';

@Component({
  standalone : true,
  selector: 'app-product-details-component',
  imports: [CurrencyPipe],
  templateUrl: './product-details-component.html',
  styleUrl: './product-details-component.css',
  providers: [ProductService]
})
export class ProductDetailsComponent {
  private id : number;
  product$: Observable<ResponseDto>;
  response : ResponseDto;
  product: any;


  constructor(private route: ActivatedRoute, public productService: ProductService) {
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.response = new ResponseDto();
    this.product = null;
    this.product$ = this.productService.getProduct(this.id);
    this.product$.subscribe({
      next: responseDto => {
        this.response = responseDto;
      },
      error: err => console.error('Error', err),
      complete: () => {
        console.log('Done');
        this.product  = this.response.result;
      }});
  }

ngOnInit(): void {
    console.log('ID from route:', this.id);
  }
}
