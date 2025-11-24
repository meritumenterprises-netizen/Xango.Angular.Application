import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CouponService, Coupon } from '../../services/CouponService';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable } from 'rxjs';
import { ResponseDto } from '../../services/ResponseDto';
import { ActivatedRoute, Router } from '@angular/router';
import { lessThanValidator, __VALIDATORS_TEST__ } from '../../validators';
import {
  FormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-edit-coupon-component',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-coupon-component.html',
  styleUrl: './edit-coupon-component.css',
})
export class EditCouponComponent {
  couponForm: FormGroup | any = null;
  coupon$: Observable<ResponseDto> | any = null;
  couponId: number | any;
  response: ResponseDto | any = null;
  public coupon: Coupon | any = null;
  constructor(
    private fb: FormBuilder,
    private couponService: CouponService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.response = new ResponseDto();
    this.couponId = parseInt(this.route.snapshot.paramMap.get('id') as string)!;
    this.coupon$ = this.couponService.getCoupon(this.couponId);
    this.couponForm = this.fb.group(
      {
        couponCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
        discountAmount: [
          '',
          [
            Validators.required,
            Validators.min(1.0),
            Validators.max(1000.0),
            Validators.pattern(/^\d*\.?\d+$/),
          ],
        ],
        minAmount: [
          '',
          [
            Validators.required,
            Validators.min(10.0),
            Validators.max(10000.0),
            Validators.pattern(/^\d*\.?\d+$/),
          ],
        ],
      },
      {
        validators: lessThanValidator('discountAmount', 'minAmount'),
      },
    );

    this.coupon$.subscribe({
      next: (responseDto: any) => {
        this.response = responseDto;
      },
      error: (err: string | undefined) => {
        console.error('Error', err);
        toastr.error(err, 'Error');
      },
      complete: () => {
        console.log('Done');
        this.coupon = this.response.result;
        this.couponForm.patchValue({
          couponCode: this.coupon.couponCode,
          discountAmount: this.coupon.discountAmount,
          minAmount: this.coupon.minAmount,
        });
      },
    });
  }

  onSubmit() {
    if (this.couponForm.invalid) {
      this.couponForm.markAllAsTouched();
      return;
    }
    console.log(this.couponForm.value.couponCode);
    console.log(this.couponForm.value.discountAmount);
    console.log(this.couponForm.value.minAmount);
    let updatedCoupon: Coupon = {
      couponId: this.couponId,
      couponCode: this.couponCode.value,
      discountAmount: this.discountAmount.value,
      minAmount: this.minAmount.value,
    };
    this.coupon$ = this.couponService.updateCounpon(updatedCoupon);
    this.coupon$.subscribe({
      error: (err: any) => {
        console.error('Error', err);
      },
      complete: () => {
          console.log('Done');
          if (this.couponService.getCoupon(this.couponId) == null) {
            this.toastr.error(
              `Could not get coupon for CouponId ${this.couponId} or the coupon does not exist`,
            );
            return;
          }
          this.toastr.success('Coupon successfully updated');
          this.router.navigate(['/coupon']);
        }
    });
  }

  get couponCode() {
    return this.couponForm.get('couponCode');
  }

  get discountAmount() {
    return this.couponForm.get('discountAmount');
  }

  get minAmount() {
    return this.couponForm.get('minAmount');
  }
}
