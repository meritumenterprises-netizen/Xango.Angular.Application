import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RouterLink } from '@angular/router';
import { ResponseDto } from '../../dto/ResponseDto';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../../services/ShoppingCartService';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/AuthenticationService';
import { UserRecord } from '../../dto/UserRecord';

@Component({
  selector: 'app-confirmation-component',
  imports: [RouterModule],
  templateUrl: './confirmation-component.html',
  styleUrl: './confirmation-component.css'
})
export class ConfirmationComponent {

  private $deleteCart : Observable<ResponseDto> | any = null;
  

  constructor(
    private shoppingCartService : ShoppingCartService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
  ) {
    let user : UserRecord | null = this.authService.getUser();
    this.$deleteCart = this.shoppingCartService.deleteCart(user!.id);
    this.$deleteCart.subscribe({
      next: (responseDto: ResponseDto | any) => {
        if (responseDto.isSuccess) {
          toastr.success("Order has been placed");
          this.router.navigate(['/']);
        }
      }
    }

    );
  }

}
