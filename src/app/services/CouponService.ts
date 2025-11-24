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
      tap(() => console.log('Fetched coupons from microservice')),
      catchError(err => {
        this.toastr.error("Error loading coupons", "Error");
        return of<ResponseDto>(); // fallback so the app doesn’t crash
      })
    );
  }

  public getCoupon(id: number) : Coupon | any {
      return this.http.get<ResponseDto>(`${this.baseUrl}/api/coupon/${id}`).pipe(
      tap(() => console.log('Fetched coupons from microservice')),
      catchError(err => {
        this.toastr.error("Error loading coupons", "Error");
        return of<ResponseDto>(); // fallback so the app doesn’t crash
      })
    );
  }

  public updateCounpon(coupon: Coupon | any ) {
      return this.http.put<ResponseDto>(`${this.baseUrl}/api/coupon`, coupon).pipe(
      tap(() => console.log('Posted coupon to update microservice')),
      catchError(err => {
        this.toastr.error("Error updating coupons" + err, "Error");
        return of<ResponseDto>(); // fallback so the app doesn’t crash
      })
    );
  }

  public getCouponByCode(code : string) : Coupon | any {
    return null;
  }

  public createCoupon(coupon : Coupon) {
    return null;
  }

  public editCoupon(coupon: Coupon) {
    return null;
  }
}
