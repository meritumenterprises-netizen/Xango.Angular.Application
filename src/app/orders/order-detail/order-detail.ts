import { Component } from '@angular/core';
import { AuthService } from '../../services/AuthenticationService';
import { OrderService } from '../../services/OrderService';
import { ResponseDto } from '../../dto/ResponseDto';
import { ToastrService } from 'ngx-toastr';
import { OrderHeader } from '../../dto/OrderHeader';
import { OrderDetail } from '../../dto/OrderDetail';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { catchError, Observable } from 'rxjs';
import { UserRecord } from '../../dto/UserRecord';
import { CurrencyPipe,DatePipe } from '@angular/common';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
  imports: [CommonModule, RouterModule],
  providers: [ AuthService, OrderService ]
})
export class OrderDetailsComponent {
  private orderId : number = 0;
  public order: OrderHeader | any;
  private order$: Observable<ResponseDto> | any = null;
  public user: UserRecord | any;
  constructor(
    private authService : AuthService,
    private orderService: OrderService,
    private toastr : ToastrService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.orderId = parseInt(this.route.snapshot.paramMap.get('id') as string)!;
    this.user = this.authService.getUser();
    this.reloadOrder();
  }

  reloadOrder() {
    this.order$ = this.orderService.get(this.orderId).subscribe({
      next: (responseDto : ResponseDto | any) => {
       this.order = responseDto.result;
      },
      error: (err: string | undefined) => {
       console.error('Error', err);
     }
   });
 
  }

  onSubmit_ReadyForPickup() {
    this.order$ = this.orderService.updateOrderStatus(this.orderId, "ReadyForPickup");
    this.order$.subscribe({
      next: (responseDto: ResponseDto | any) => {
        if (responseDto.isSuccess) {
          this.reloadOrder();
          console.log("Marked order as Ready for pickup");
        }
      },
        catchError: (err: Error) => {
          this.toastr.error(err.message, "Error");
        }
    });
  }

  onSubmit_Complete() {
    this.order$ = this.orderService.updateOrderStatus(this.orderId, "Complete");
    this.order$.subscribe({
      next: (responseDto: ResponseDto | any) => {
        if (responseDto.isSuccess) {
          this.reloadOrder();
          console.log("Marked order as Complete");
        }
      },
        catchError: (err: Error) => {
          this.toastr.error(err.message, "Error");
        }
    });
  }

  onSubmit_CancelOrder() {
    this.order$ = this.orderService.updateOrderStatus(this.orderId, "Cancelled");
    this.order$.subscribe({
      next: (responseDto: ResponseDto | any) => {
        if (responseDto.isSuccess) {
          this.reloadOrder();
          console.log("Marked order as Cancelled");
        }
      },
        catchError: (err: Error) => {
          this.toastr.error(err.message, "Error");
        }
    });

  }

  onSubmit_DeleteOrder() {
    this.order$ = this.orderService.deleteOrder(this.orderId);
    this.order$.subscribe({
      next: (responseDto: ResponseDto | any) => {
        if (responseDto.isSuccess) {
          this.router.navigate(["/order"]);
          console.log("Deleted order " + this.orderId);
        }
      },
        catchError: (err: Error) => {
          this.toastr.error(err.message, "Error");
        }
    });
  }
}
