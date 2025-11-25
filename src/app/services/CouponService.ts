import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ResponseDto } from './ResponseDto';
import { Observable, catchError, of, tap } from 'rxjs';
import { ServiceSettings } from './ServiceSettings';
import { ToastrService } from 'ngx-toastr';

export interface Coupon {
  couponId : number;
  couponCode : string;
  discountAmount : number;
  minAmount : number;
}

@Injectable({
  providedIn: 'root'
})
export class CouponService {
  private readonly baseUrl = ServiceSettings.COUPON_API;

    constructor(public http: HttpClient, public toastr: ToastrService ) {
      toastr.toastrConfig.timeOut = 5000;
      toastr.toastrConfig.closeButton = true;
  }

  public getCoupons() : Coupon[] | any {
      return this.http.get<ResponseDto>(`${this.baseUrl}/api/coupon`).pipe(
       tap((responseDto) => {
        if (!responseDto.isSuccess) {
          throw new Error(responseDto.message);
        }
      }),
      catchError(err => {
        this.toastr.error("Error loading coupons", "Error");
        return of<ResponseDto>(); // fallback so the app doesn’t crash
      })
    );
  }

  public getCoupon(id: number) : Coupon | any {
      return this.http.get<ResponseDto>(`${this.baseUrl}/api/coupon/${id}`).pipe(
       tap((responseDto) => {
        if (!responseDto.isSuccess) {
          throw new Error(responseDto.message);
        }
      }),
      catchError(err => {
        this.toastr.error("Error loading coupons", "Error");
        return of<ResponseDto>(); // fallback so the app doesn’t crash
      })
    );
  }

  
  public getCouponByCode(code : string) : Coupon | any {
    return null;
  }

  public createCoupon(coupon : Coupon) {
      return this.http.post<ResponseDto>(`${this.baseUrl}/api/coupon`, coupon).pipe(
       tap((responseDto) => {
        if (!responseDto.isSuccess) {
          throw new Error(responseDto.message);
        }
      }),
      catchError(err => {
        this.toastr.error("Error creating coupons\r\n" + err, "Error");
        return err;
      })
    );
  }

  public updateCounpon(coupon: Coupon | any ) {
      return this.http.put<ResponseDto>(`${this.baseUrl}/api/coupon`, coupon).pipe(
      tap((responseDto) => {
        if (!responseDto.isSuccess) {
          throw new Error(responseDto.message);
        }
      }),
      catchError(err => {
        this.toastr.error("Error updating coupons\r\n" + err, "Error");
        return err;
      })
    );
  }

  public deleteCoupon(id : number) {
      return this.http.delete<ResponseDto>(`${this.baseUrl}/api/coupon/${id}`).pipe(
      tap((responseDto) => {
        if (!responseDto.isSuccess) {
          throw new Error(responseDto.message);
        }
      }),
      catchError(err => {
        this.toastr.error("Error deleting coupon\r\n" + err, "Error");
        return err;
      })
    );
  }
}
