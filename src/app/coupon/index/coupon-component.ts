import { Component } from '@angular/core';
import { CouponService, Coupon } from '../../services/CouponService';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ResponseDto } from '../../services/ResponseDto';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-coupon-component',
  imports: [CurrencyPipe],
  templateUrl: './coupon-component.html',
  styleUrl: './coupon-component.css'
})
export class CouponComponent {
      coupons$: Observable<ResponseDto> | any = null;
      response : ResponseDto | any = null;
      coupons: Coupon[] | any;
  
  constructor(private couponService : CouponService, private toastr: ToastrService) {
    this.response = new ResponseDto();
    this.coupons = [];
    this.coupons$ = this.couponService.getCoupons();
    this.coupons$.subscribe({
      next: (responseDto: any) => {
        this.response = responseDto;
      },
      error: (err: string | undefined) => {
        console.error('Error', err);
        toastr.error(err, "Error");
      },
      complete: () => {
        console.log('Done');
        this.coupons  = this.response.result;
      }});

  }
}
