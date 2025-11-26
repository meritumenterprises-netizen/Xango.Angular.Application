import { Component, HostListener, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/ProductService';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ResponseDto } from '../../services/ResponseDto';
import { ActivatedRoute, Router } from '@angular/router';
import { lessThanValidator, __VALIDATORS_TEST__ } from '../../validators';
import { CanComponentDeactivate } from '../../services/UnsavedChangesGuard';
import { RouterLink, RouterModule } from '@angular/router';
import { CanComponentDeactivatable } from '../../services/CanComponentDeactivatable';
import Swal from 'sweetalert2';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-product-edit-component',
  templateUrl: './edit-product-component.html',
  styleUrl: './edit-product-component.css',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  providers: [ProductService],
})
export class ProductEditComponent extends CanComponentDeactivatable {
  productForm: FormGroup | any = null;
  product$: Observable<ResponseDto> | any = null;
  product: Product | any = null;
  response: ResponseDto | any = null;
  productId!: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super();
    this.productId = parseInt(this.route.snapshot.paramMap.get('id') as string)!;
    this.productForm = this.fb.group(
      {
        productName: [
          '', 
          [
            Validators.required, 
            Validators.minLength(6), 
            Validators.maxLength(100)]],
        price: [
          '',
          [
            Validators.required,
            Validators.min(1.0),
            Validators.max(1000.0),
            Validators.pattern(/^\d*\.?\d+$/),
          ],
        ],
        description: [
          '', 
          [
            Validators.required, 
            Validators.minLength(4), 
            Validators.maxLength(2000)]],
        categoryName: 
        [
          '', 
          [
            Validators.required, 
            Validators.minLength(4), 
            Validators.maxLength(50)]],
        stockInventory: [
          '',
          [
            Validators.required,
            Validators.min(1),
            Validators.max(10000),
            Validators.pattern(/^\d+$/),
          ],
        ],
      },
      {
        //validators: lessThanValidator('discountAmount', 'minAmount'),
      },
    );

    
    this.form = this.productForm;
    
    this.product$ = this.productService.getProduct(this.productId);
    this.product$.subscribe({
      next: (responseDto: any) => {
        this.response = responseDto;
      },
      error: (err: string | undefined) => {
        console.error('Error', err);
      },
      complete: () => {
        console.log('Done');
        this.product = this.response.result;
        this.productForm.patchValue({
          productName: this.product.name,
          categoryName: this.product.categoryName,
          description: this.product.description,
          price: this.product.price,
          stockInventory: this.product.stockInventory
        });
        this.productForm.markAsPristine();
      },
    });

  }

  get productName() {
    return this.productForm.get('productName');
  }

  get categoryName() {
    return this.productForm.get('categoryName');
  }

  get description() {
    return this.productForm.get('description');
  }

  get price() {
    return this.productForm.get('price');
  }

  get stockInventory() {
    return this.productForm.get('stockInventory');
  }

  //   canDeactivate(): Promise<boolean> | boolean {
  //   // If form is not dirty — allow navigation
  //   if (!this.productForm || !this.productForm.dirty) {
  //     return true;
  //   }
  //   return Swal.fire({
  //     title: 'You have unsaved changes',
  //     text: 'Do you really want to leave without saving?',
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonText: 'Leave',
  //     cancelButtonText: 'Stay',
  //     customClass: {
  //       popup: 'rounded-swal'
  //     }
  //   }).then(result => !!result.isConfirmed);
  // }

  // @HostListener('window:beforeunload', ['$event'])
  // beforeUnloadHandler(event: BeforeUnloadEvent) {
  //   if (this.productForm && this.productForm.dirty) {
  //     // Modern browsers ignore custom messages; set returnValue to trigger prompt.
  //     event.preventDefault();
  //     event.returnValue = '';
  //   }
  // }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }
    console.log(this.productForm.value.name);
    console.log(this.productForm.value.categoryName);
    console.log(this.productForm.value.description);
    console.log(this.productForm.value.price);
    console.log(this.productForm.value.stockInventory);
    let updatedProduct: Product = {
      productId: this.productId,
      name: this.productName.value,
      categoryName: this.categoryName.value,
      description: this.description.value,
      price: this.price.value,
      stockInventory: this.stockInventory.value,
      base64Image: null,
      imageUrl: null,
      imageLocalPath: null,
      count: 1
    };
    this.product$ = this.productService.updateProduct(updatedProduct);
    this.product$.subscribe({
      error: (err: any) => {
        console.error('Error', err);
      },
      complete: () => {
          console.log('Done');
          this.productForm.markAsPristine();
          this.toastr.success('Product successfully updated');
          this.router.navigate(['/product']);
        }
    });

  }
}


