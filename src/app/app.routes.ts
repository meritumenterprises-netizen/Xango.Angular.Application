import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login-component';
import { RegisterComponent } from './register/register-component';



export const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' }, // default route
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/' } // wildcard route
];

