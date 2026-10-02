import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environments';
import { OrderDTO } from '../../dtos/order/order.dto';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-order',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './order.html',
  styleUrl: './order.css',
})
export class Order implements OnInit {
  orderForm!: FormGroup;
  cartItems: { product: Product; quantity: number }[] = [];
  totalAmount: number = 0;
  orderData: OrderDTO = {
    user_id: 7,
    fullname: '',
    email: '',
    phone_number: '',
    address: '',
    note: '',
    total_money: 0,
    payment_method: 'cash',
    shipping_method: 'fast',
    coupon_code: '',
    cart_items: [],
  };

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private fb: FormBuilder,
    private orderService: OrderService,
    private tokenService: TokenService,
  ) {
    this.orderForm = this.fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{6,12}$')]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      note: ['', [Validators.maxLength(100)]],
      shipping_method: ['fast'],
      payment_method: ['cash'],
    });
  }

  ngOnInit(): void {
    this.orderData.user_id = this.tokenService.getUserId();
    // Lấy thông tin giỏ hàng từ service
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys());
    if (productIds.length === 0) {
      return;
    }
    this.productService.getProductsByIds(productIds.join(',')).subscribe({
      next: (products: any) => {
        // Lấy thông tin sản phẩm và số lượng từ danh sách sản phẩm và giỏ hàng
        this.cartItems = productIds.map((productId: number) => {
          const product = products.find((p: Product) => p.id === productId);
          if (product) {
            product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }
          return {
            product: product!,
            quantity: cart.get(productId)!,
          };
        });
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.getTotalPrice();
      },
    });
  }

  public getTotalPrice() {
    this.totalAmount = this.cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  }

  placeOrder() {
    if (this.orderForm.valid) {
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value,
      };
      this.orderData.cart_items = this.cartItems.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      }));
      this.orderData.total_money = this.totalAmount;
      this.orderService.createOrder(this.orderData).subscribe({
        next: (response) => {
          const orderId = response.id;
          this.cartService.clearCart();
          this.router.navigate(['/orders', orderId]);
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {},
      });
    }
  }
}
