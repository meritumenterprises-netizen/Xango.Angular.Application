import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css'
})
export class RegisterComponent {
  onSubmit(value: any) {
    console.log(value.email);
    console.log(value.name);
    console.log(value.phone);
    console.log(value.password);
    console.log(value.role);
  }
}
