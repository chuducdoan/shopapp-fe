import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Order } from './components/order/order';
import { OrderConfirm } from './components/order-confirm/order-confirm';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'order', component: Order },
  { path: 'order-confirm', component: OrderConfirm },
  { path: '**', redirectTo: '' }
];
