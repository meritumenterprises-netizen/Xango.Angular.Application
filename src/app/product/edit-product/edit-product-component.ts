import { Component } from '@angular/core';
import { ProductService, Product } from '../../services/ProductService';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ResponseDto } from '../../services/ResponseDto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit-component',
  templateUrl: './edit-product-component.html',
  styleUrl: './edit-product-component.css',
  providers: [ProductService]
})
export class ProductEditComponent {
      product$: Observable<ResponseDto> | any = null;
      product : Product | any = null;
      response : ResponseDto | any = null;
      productId!: number;
  
  constructor(private productService: ProductService, private toastr : ToastrService, private route: ActivatedRoute) {
   this.productId = parseInt(this.route.snapshot.paramMap.get('id') as string)!;
   this.product$ = this.productService.getProduct(this.productId);
   this.product$.subscribe({
      next: (responseDto: any) => {
        this.response = responseDto;
      },
      error: (err: string | undefined) => {
        console.error('Error', err);
        toastr.error(err, "Error");
      },
      complete: () => {
        console.log('Done');
        this.product  = this.response.result;
      }});
  }
}
