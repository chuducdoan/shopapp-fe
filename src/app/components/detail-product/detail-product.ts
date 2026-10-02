import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductImage } from '../../models/product_image.model';
import { environment } from '../../environments/environments';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css',
})
export class DetailProduct implements OnInit {

  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;

  constructor(
    private productService: ProductService, 
    private cartService : CartService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
    });
    if (!isNaN(this.productId)) {
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (data:any) => {
          if (data.product_images && data.product_images.length > 0) {
            data.product_images.forEach((productImage: ProductImage) => {
              productImage.image_url = `${environment.apiBaseUrl}/products/images/${productImage.image_url}`;
            });
          }
          this.product = data;
          this.showImage(0);
           console.log(this.product)
        },
        error: (error:any) => {
          console.error('Error finding product:', error);
        }
      });
    }
  }

  showImage(index: number) : void {
    if (this.product && this.product.product_images && this.product.product_images.length > 0) {
     if (index < 0) {
      index = 0;
     } else if (index >= this.product.product_images.length) {
      index = this.product.product_images.length - 1;
     }
     this.currentImageIndex = index;
    }
  }

  thumbnailClick(index: number) {
    this.currentImageIndex = index;
  }

  nextImage(): void {
    this.showImage(this.currentImageIndex + 1);
  }

  prevImage(): void {
    this.showImage(this.currentImageIndex - 1);
  }

  addToCart(){
    if (this.product) {
      this.cartService.addToCart(this.product.id, this.quantity);
    }
  }

  incrementQuantity(){
    this.quantity++;
  }

  decrementQuantity(){
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
}
