import { Component } from '@angular/core';
import { Router,  RouterLinkActive,RouterModule, RouterOutlet } from '@angular/router';


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

}
