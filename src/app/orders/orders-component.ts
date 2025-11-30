import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/AuthenticationService';
import { OrderService } from '../services/OrderService';
import { CommonModule, NgClass } from '@angular/common';
import { UserRecord } from '../dto/UserRecord';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dto/ResponseDto';
import { OrderHeader } from '../dto/OrderHeader';

@Component({
  selector: 'app-orders-component',
  imports: [CommonModule],
  templateUrl: './orders-component.html',
  styleUrl: './orders-component.css'
})
export class OrdersComponent {
  public status : string = "all";
  public user : UserRecord | null;
  private orders$ : Observable<ResponseDto> | null = null;
  public orders : OrderHeader[] | null = null;
  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private route : ActivatedRoute,
    private router: Router
  ) {
    this.status = this.route.snapshot.paramMap.get('status') as string;
    if (this.status == null) {
      this.status = "all";
    }
    this.user = this.authService.getUser();
    this.reloadOrders();
  }

  reloadOrders() {
    this.orders$ = this.orderService.getAll(this.user!.id, this.status);
    this.orders$.subscribe({
      next: (response : ResponseDto | any) => {
        this.orders = response.result;
      }
    });

  }

  onClickPending() {
    console.log("Clicked Pending");
    this.router.navigate(['/order/pending']);
    this.status = "pending";
    this.reloadOrders();
  }

  onClickApproved() {
    console.log("Clicked Approved");
    this.router.navigate(['/order/approved']);
    this.status = "approved";
    this.reloadOrders();
  }

  onClickReadyForPickup() {
    console.log("Clicked ReadyForPickup");
    this.router.navigate(['/order/readyforpickup']);
    this.status = "readyforpickup";
    this.reloadOrders();
  }

  onClickCancelled() {
    console.log("Clicked Cancelled");
    this.router.navigate(['/order/cancelled']);
    this.status = "cancelled";
    this.reloadOrders();
  }

  onClickCompleted() {
    console.log("Clicked Complete");
    this.router.navigate(['/order/complete']);
    this.status = "complete";
    this.reloadOrders();
  }

  onClickAll() {
    console.log("Clicked All");
    this.router.navigate(['/order/all']);
    this.status = "all";
    this.reloadOrders();
  }

  onEditOrder(orderId: number) {
    console.log("Editing order");
    this.router.navigate(['/order/details/' + orderId]);
  }
}
