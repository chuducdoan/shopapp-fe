import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Order } from './components/order/order';
import { OrderConfirm } from './components/order-confirm/order-confirm';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { DetailProduct } from './components/detail-product/detail-product';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'order', component: Order },
  { path: 'order-confirm', component: OrderConfirm },
  { path: 'login', component: Login },
  { path:'register',component:Register},
  { path:'detail-product', component:DetailProduct},
  { path: '**', redirectTo: '' }
];
