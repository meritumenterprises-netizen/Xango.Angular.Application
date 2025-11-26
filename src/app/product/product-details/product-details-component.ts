import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../services/ProductService';
import { ResponseDto } from '../../services/ResponseDto';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/AuthenticationService';
import { ShoppingCartService } from '../../services/ShoppingCartService'; 
import { Router, RouterLink } from '@angular/router';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  standalone : true,
  selector: 'app-product-details-component',
  imports: [CurrencyPipe, FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './product-details-component.html',
  styleUrl: './product-details-component.css',
  providers: [ProductService, ShoppingCartService]
})
export class ProductDetailsComponent {
  private id : number;
  private product$: Observable<ResponseDto>;
  private shoppingCart$: Observable<ResponseDto> | null = null;
  response : ResponseDto;
  product: any;


  constructor(
    private route: ActivatedRoute, 
    public productService: ProductService, 
    private toastr: ToastrService, 
    private authService: AuthService,
    private shoppingCartService : ShoppingCartService,
    private router: Router
  ) {
    this.toastr.toastrConfig.enableHtml = true;
    this.id = parseInt(this.route.snapshot.paramMap.get('id')!);
    this.response = new ResponseDto();
    this.product = null;
    this.product$ = this.productService.getProduct(this.id);
    this.product$.subscribe({
      next: responseDto => {
        this.response = responseDto;
      },
      error: err => {
        console.error('Error', err);
        this.product = null;
      },
      complete: () => {
        console.log('Done');
        this.product  = this.response.result;
        if (this.product == null) {
          toastr.error(`Product with id ${this.id} has not been found`);
        }
      }});
  }

onSubmit(quantity : string, stockQuantity: string) {
  console.log("Adding product to shopping cart");
  let quantityVal = parseInt(quantity);
  this.shoppingCart$ = this.shoppingCartService.addProductToCart(this.id, quantityVal, parseInt(stockQuantity));
  this.shoppingCart$.subscribe({
    next: responseDto => {
      this.response = responseDto;
      if (!this.response.isSuccess) {
        throw new Error(this.response.message);
      }
      this.router.navigate(['/cart']);
    }
  })
  
}

  isLoggedIn() {
    return this.authService.isUserLoggedIn();
  }
}
