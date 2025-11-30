import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Product } from '../dto/Product';
import { OrderHeader } from '../dto/OrderHeader';
import { OrderDetail } from '../dto/OrderDetail';
import { ToastrService } from 'ngx-toastr';
import { ServiceSettings } from './ServiceSettings';
import { ResponseDto } from '../dto/ResponseDto';
import { ShoppingCartHeader } from '../dto/ShoppingCartHeader';
import { catchError, tap } from 'rxjs';
import { StripeRequest } from '../dto/StripeRequest';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly baseUrl = ServiceSettings.ORDER_API;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService 
    ) {
    toastr.toastrConfig.timeOut = 5000;
    toastr.toastrConfig.closeButton = true;
    toastr.toastrConfig.enableHtml = true;
  }

    public createOrder(shoppingCart: ShoppingCartHeader) {
      return this.http.post<ResponseDto>(`${this.baseUrl}/api/order/CreateOrder`, shoppingCart).pipe(
         tap((responseDto : ResponseDto) => {
          if (!responseDto.isSuccess) {
            throw new Error(responseDto.message);
          }
        }),
        catchError(err => {
        this.toastr.error(`Error creating order<br/><br/>` + err, "Error");
        throw err;
        })
      );
    }

    public createStripeSession(stripeRequest: StripeRequest) {
      return this.http.post<ResponseDto>(`${this.baseUrl}/api/order/CreateStripeSession`, stripeRequest).pipe (
        tap((responseDto: ResponseDto) => {
          if (!responseDto.isSuccess) {
            throw new Error(responseDto.message);
          }
        }),
        catchError(err => {
          this.toastr.error(`Error creating Stripe session <br/><br/>` + err, "Error");
          throw err;
  
        })
      )
    }
}
