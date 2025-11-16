// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

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

export class ResponseDto {
  result : string;
  isSuccess: boolean;
  message : string;
  stackTrace : string;

  constructor()  {
    this.result = "";
    this.isSuccess = false;
    this.message = "";
    this.stackTrace = "";
  }
}

@Injectable()
export class ProductService {
  private readonly baseUrl = 'http://product-api.default.svc.cluster.local'; // 👈 your microservice URL

  constructor(public http: HttpClient) {}

  public getProducts() {
    return this.http.get<ResponseDto>(`${this.baseUrl}/api/product`).pipe(
      tap(() => console.log('Fetched products from microservice')),
      catchError(err => {
        console.error('Error loading products', err);
        return of<ResponseDto>(); // fallback so the app doesn’t crash
      })
    );
  }

  public getProduct (productId : number) {
    return this.http.get<ResponseDto>(`${this.baseUrl}/api/product/${productId}`).pipe(
      tap(() => console.log(`Fetched product with product id ${productId} from microservice`)),
      catchError(err => {
        console.error(`Error loading product with product id ${productId}`, err);
        return of<ResponseDto>(); // fallback so the app doesn’t crash
      })
    );
  }
}
