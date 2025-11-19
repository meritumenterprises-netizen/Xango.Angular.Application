import { Component } from '@angular/core';
import { Router,  RouterLinkActive,RouterModule, RouterOutlet } from '@angular/router';
import { UserRecord, AuthService } from '../../services/AuthenticationService';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
    imports: [
       RouterModule,
    
  ],

})
export class HeaderComponent {
  constructor (private authService: AuthService) {

  }

  public getUserName() : string | any{
    return this.authService.getUser()?.email;
  }

  public isUserLoggedIn() : boolean {
    return this.authService.isUserLoggedIn();
  }

  public isAdmin() : boolean {
    return this.authService.isAdmin();
  }
}
