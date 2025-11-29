import { Component, signal } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { ContainerComponent } from "./layout/container/container.component";
import { FooterComponent } from './layout/footer/footer.component';
import { CommonModule } from '@angular/common';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './loader-component/loader-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ContainerComponent, FooterComponent, CommonModule, ToastrModule, LoaderComponent ],
  templateUrl: './app.component.html',
  styleUrl: "./app.component.css"
})
export class AppComponent {
  protected readonly title = signal('Xango Angular Application');

  constructor() {
  }
}
