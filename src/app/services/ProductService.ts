// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { ServiceSettings } from './ServiceSettings';
import { ResponseDto } from './ResponseDto';
import { AppComponent } from '../app.component';
import { ToastrService } from 'ngx-toastr';

export interface Product {
        productId : number;
        name : string;
        price : number;
        description : string;
        categoryName : string;
        base64Image? : string | null;
        imageUrl : string | null;
        imageLocalPath? : string | null;
        count : number;
        stockInventory : number;
}

@Injectable()
export class ProductService {
  private readonly baseUrl = ServiceSettings.PRODUCT_API;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService 
    ) {
    toastr.toastrConfig.timeOut = 5000;
    toastr.toastrConfig.closeButton = true;
  }

  public getProducts() {
    return this.http.get<ResponseDto>(`${this.baseUrl}/api/product`).pipe(
       tap((responseDto) => {
        if (!responseDto.isSuccess) {
          throw new Error(responseDto.message);
        }
      }),
      catchError(err => {
        this.toastr.error("Error loading products\r\n" + err, "Error");
        throw err;
      })
    );
  }

  public getProduct (productId : number) {
    return this.http.get<ResponseDto>(`${this.baseUrl}/api/product/${productId}`).pipe(
       tap((responseDto) => {
        if (!responseDto.isSuccess) {
          throw new Error(responseDto.message);
        }
      }),
      catchError(err => {
      this.toastr.error(`Error loading product with product id ${productId}\r\n` + err, "Error");
      throw err;
      })
    );
  }

  public createProduct(product: Product) {
    return this.http.post<ResponseDto>(`${this.baseUrl}/api/product/`, product).pipe(
       tap((responseDto) => {
        if (!responseDto.isSuccess) {
          throw new Error(responseDto.message);
        }
      }),
      catchError(err => {
      this.toastr.error(`Error creating product\r\n` + err, "Error");
      throw err;
      })
    );
  }

  public updateProduct(product: Product) {
    return this.http.put<ResponseDto>(`${this.baseUrl}/api/product`, product).pipe(
       tap((responseDto) => {
        if (!responseDto.isSuccess) {
          throw new Error(responseDto.message);
        }
      }),
      catchError(err => {
      this.toastr.error(`Error updating product with product id ${product.productId}\r\n` + err, "Error");
      throw err;
      })
    );
  }

  public deleteProduct(productId : number) {
      return this.http.delete<ResponseDto>(`${this.baseUrl}/api/product/${productId}`).pipe(
      tap((responseDto) => {
        if (!responseDto.isSuccess) {
          throw new Error(responseDto.message);
        }
      }),
      catchError(err => {
        this.toastr.error("Error deleting product\r\n" + err, "Error");
        throw err;
      })
    );

  }
}
