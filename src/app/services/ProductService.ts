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
        base64Image? : string;
        imageUrl : string;
        imageLocalPath : string;
        count : number;
        stockInventory : number;
}

@Injectable()
export class ProductService {
  private readonly baseUrl = ServiceSettings.PRODUCT_API;

  constructor(public http: HttpClient, public toastr: ToastrService ) {
    toastr.toastrConfig.timeOut = 1500;
    toastr.toastrConfig.closeButton = true;
  }

  public getProducts() {
    return this.http.get<ResponseDto>(`${this.baseUrl}/api/product`).pipe(
      tap(() => console.log('Fetched products from microservice')),
      catchError(err => {
        this.toastr.error("Error loading products", "Error");
        return of<ResponseDto>(); // fallback so the app doesn’t crash
      })
    );
  }

  public getProduct (productId : number) {
    return this.http.get<ResponseDto>(`${this.baseUrl}/api/product/${productId}`).pipe(
      tap(() => console.log(`Fetched product with product id ${productId} from microservice`)),
      catchError(err => {
      this.toastr.error(`Error loading product with product id ${productId}`, "Error");
      //console.error(`Error loading product with product id ${productId}`, err);
        return of<ResponseDto>(); // fallback so the app doesn’t crash
      })
    );
  }
}
