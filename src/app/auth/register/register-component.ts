import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register-component.html',
  styleUrl: './register-component.css'
})
export class RegisterComponent {
  private readonly emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

  // Password: ≥8 chars, 1 uppercase, 1 digit, 1 special character
  private readonly passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

  public registerForm: FormGroup;

    constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      // ✔ safe now
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      name: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)],
      ],
      role: ['', [Validators.required]]
    });
  }


  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    console.log(this.registerForm.value.email);
    console.log(this.registerForm.value.name);
    console.log(this.registerForm.value.phone);
    console.log(this.registerForm.value.password);
    console.log(this.registerForm.value.role);
  }

get email() {
    return this.registerForm.get('email');
  }

  get name() {
    return this.registerForm.get('name');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get password() {
    return this.registerForm.get('password');
  }  

  get role() {
    return this.registerForm.get('role');
  }
}
