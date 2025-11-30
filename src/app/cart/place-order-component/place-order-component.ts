import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ResponseDto } from '../../dto/ResponseDto';
import { RouterModule } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ShoppingCartHeader } from '../../dto/ShoppingCartHeader';
import { ShoppingCartDetail } from '../../dto/ShoppingCartDetail';
import { ShoppingCart } from '../../dto/ShoppingCart';
import { ShoppingCartService } from '../../services/ShoppingCartService';
import { OrderHeader } from '../../dto/OrderHeader';
import { OrderDetail } from '../../dto/OrderDetail';
import { OrderService } from '../../services/OrderService';
import { StripeRequest } from '../../dto/StripeRequest';

@Component({
  standalone: true,
  selector: 'app-place-order-component',
  imports: [],
  templateUrl: './place-order-component.html',
  styleUrl: './place-order-component.css'
})
export class PlaceOrderComponent {
  private shoppingCart$: Observable<ResponseDto> | null= null;
  private shoppingCart: ShoppingCart | any = null;
  private order$: Observable<ResponseDto> | null = null;
  private stripeSession$: Observable<ResponseDto> | null = null;
  private stripeRequest : StripeRequest | null = null;
  private order: OrderHeader | any  = null;
  private response: ResponseDto | any = null;
  private stripeSessionUrl : string | null = null;
constructor(
  private shoppingCartService: ShoppingCartService,
  private orderService: OrderService,
  private router: Router,
  private toastr: ToastrService,
  ) {
    window.history.pushState({ redirect: true }, '', '/cart/checkout');
    window.onpopstate = (event) => {
      if (event.state?.redirect) {
        window.location.href = '/cart';
      }
    };
    this.shoppingCart$ = this.shoppingCartService.getShoppingCart();
    this.shoppingCart$.subscribe({
      next: (responseDto) => {
        this.response = responseDto;
        console.log('Done');
        this.shoppingCart = this.response.result;
        if (this.shoppingCart == null) {
          this.toastr.error(`No shopping cart for the currently logged on user has been found`);
          this.router.navigate(['/']);
          return;
        }

        this.order$ = this.orderService.createOrder(this.shoppingCart);
        this.order$.subscribe({
          next: (responseDto : ResponseDto) => {
            console.log("Created order");
            this.order = responseDto.result;
            this.stripeRequest = {
              approvedUrl : "http://localhost:4200/cart/confirmation/" + this.order.orderHeaderId,
              cancelUrl : "http://localhost:4200/cart/checkout",
              orderHeader : this.order
            };
            this.order.orderTotalWithCurrency = "$" + this.order.orderTotal.toFixed(2).toString();
            this.stripeSession$ = this.orderService.createStripeSession(this.stripeRequest);
            this.stripeSession$.subscribe({
              next: (responseDto : ResponseDto) => {
                console.log("Stripe session id created");
                let stripeResponse : StripeRequest | any = responseDto.result;
                window.location.href = stripeResponse.stripeSessionUrl;
                
              },
              error: (err) => {
                console.log(err);
              }
            });
          },
          error: (err) => {
            console.log("error creating order");
          }
      });
      },
      error: (err) => {
        console.error('Error', err);
        this.shoppingCart = null;
        this.router.navigate(['/']);
      },
    });

  }

}
