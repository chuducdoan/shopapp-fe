import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { environment } from '../../environments/environments';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  products: Product[] = [];
  currentPage: number = 1;
  itemPerPage: number = 10;
  totalPage: number = 0;
  visiblePages: number[] = [];
  selectedCategoryId: number = 0;
  categories: Category[] = [];
  keyword: string = "";

  constructor(
    private productService: ProductService, 
    private categoryService: CategoryService, 
    private cartService: CartService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getAllProduct(this.keyword, this.selectedCategoryId, this.currentPage, this.itemPerPage);
    this.getAllCategory();
  }

  getAllProduct(keyword: string, selectedCategoryId: number,page: number, limit: number) {
    this.productService.getAllProduct(keyword, selectedCategoryId, page, limit).subscribe({
      next: (response: any) => {
        response.products.forEach((product: Product) => {
          product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
        });
        this.products = response.products;
        this.totalPage = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPage);
        console.log(this.visiblePages)
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  getAllCategory() {
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        this.categories = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  onPageChange(page: number, e: Event) {
    e.preventDefault();
    this.currentPage = page;
    this.getAllProduct(this.keyword, this.selectedCategoryId, this.currentPage, this.itemPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    if (!totalPages || totalPages <= 0 || isNaN(totalPages)) {
    return [];
  }

    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(currentPage - halfVisiblePages, 1);
    let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(endPage - maxVisiblePages + 1, 1);
    }

    return new Array(endPage - startPage + 1).fill(0).map((_, i) => startPage + i);
  }

  searchProducts() {
    this.currentPage = 1;
    this.itemPerPage = 10;
    this.getAllProduct(this.keyword, this.selectedCategoryId, this.currentPage, this.itemPerPage);
  }

  addCart(productId: number) {
    this.cartService.addToCart(productId, 1);
  } 

  onDetailClick(productId: number) {
    this.router.navigate(['/products', productId]);
  } 
}
