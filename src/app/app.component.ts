import { Component, signal } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { ContainerComponent } from "./layout/container/container.component";
import { FooterComponent } from './layout/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ContainerComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: "./app.component.css"
})
export class AppComponent {
  protected readonly title = signal('Xango.Angular.Application');
}
