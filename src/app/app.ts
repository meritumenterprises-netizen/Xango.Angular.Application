import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header';
import { ContainerComponent } from "./layout/container/container";
import { FooterComponent } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, ContainerComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: "./app.css"
})
export class App {
  protected readonly title = signal('Xango.Angular.Application');
}
