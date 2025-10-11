import { Component, signal } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { ContainerComponent } from "./layout/container/container.component";
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ContainerComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: "./app.component.css"
})
export class AppComponent {
  protected readonly title = signal('Xango.Angular.Application');
}
