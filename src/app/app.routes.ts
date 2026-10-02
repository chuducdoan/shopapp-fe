import { Routes } from '@angular/router';
import { DetailProduct } from './components/detail-product/detail-product';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { OrderDetail } from './components/order-detail/order-detail';
import { Order } from './components/order/order';
import { Register } from './components/register/register';
import { UserProfile } from './components/user-profile/user-profile';
import { AuthGuardFn } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'orders', component: Order, canActivate: [AuthGuardFn] },
  { path: 'orders/:id', component: OrderDetail, canActivate: [AuthGuardFn] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'products/:id', component: DetailProduct },
  { path: 'profile', component: UserProfile, canActivate: [AuthGuardFn] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
