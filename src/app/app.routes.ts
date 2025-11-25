import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login-component';
import { RegisterComponent } from './auth/register/register-component';
import { HomeComponent } from './home/home-component';
import { CouponComponent } from './coupon/index/coupon-component';
import { EditCouponComponent } from './coupon/edit-coupon-component/edit-coupon-component';
import { DeleteCouponComponent } from './coupon/delete-coupon-component/delete-coupon-component';
import { ProductComponent } from './product/index/product-component';
import { OrdersComponent } from './orders/orders-component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart-component';
import { CreateCouponComponent } from './coupon/create-coupon-component/create-coupon-component';
import { CreateProductComponent } from './product/create-product/create-product-component';
import { ProductEditComponent } from './product/edit-product/edit-product-component';
import { ProductDetailsComponent } from './product/product-details/product-details-component';
import { LogoutComponent } from './auth/logout/logout-component';
import { UnsavedChangesGuard } from './UnsavedChangesGuard';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // default route
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'coupon/create', component: CreateCouponComponent, canDeactivate: [UnsavedChangesGuard] },
  { path: 'coupon/edit/:id', component: EditCouponComponent, canDeactivate: [UnsavedChangesGuard] },
  { path: 'coupon/delete/:id', component: DeleteCouponComponent },
  { path: 'coupon', component: CouponComponent },
  { path: 'product/create', component: CreateProductComponent },
  { path: 'product/edit/:id', component: ProductEditComponent },
  { path: 'product/details/:id', component: ProductDetailsComponent },
  { path: 'product', component: ProductComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'cart', component: ShoppingCartComponent },
  { path: '**', redirectTo: '/' } // wildcard route
];

