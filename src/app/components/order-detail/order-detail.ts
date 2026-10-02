import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderResponse } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { environment } from '../../environments/environments';
import { OrderDetailResponse } from '../../models/order.detail';

@Component({
  selector: 'app-order-detail',
  imports: [CommonModule],
  templateUrl: './order-detail.html',
  styleUrl: './order-detail.css',
})
export class OrderDetail implements OnInit{

  orderResponse: OrderResponse = {
    id: 0,
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
    note: '',
    order_date: '',
    status: '',
    total_money: 0,
    shipping_method: '',
    shipping_address: '',
    shipping_date: '',
    tracking_method: '',
    payment_method: '',
    active: false,
    user_id: 0,
    order_details: []
  }

  constructor(
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    const orderId = parseInt(this.route.snapshot.params['id']);
    if (isNaN(orderId)) {
      console.log('Order ID is not valid');
      this.router.navigate(['/orders']);
    }
    this.orderService.getOrder(orderId).subscribe({
      next: (response: any) => {
      this.orderResponse = {
        ...this.orderResponse,
        ...response
      }
      this.orderResponse.order_details.forEach((item: OrderDetailResponse) => {
        item.product.thumbnail = `${environment.apiBaseUrl}/products/images/${item.product.thumbnail}`;
      });
    },
    error: (error) => {
      console.log(error);
    }
   });
  }

 



  order() {
    // Chuyển sang trang thanh toán
    this.router.navigate(['/order']);
  }
}
