import { Component, inject } from '@angular/core';

import { ExpenseService } from '../../../services/expense.service';
import { CategoryForm } from '../category-form/category-form';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CategoryForm],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent {
  expenseService = inject(ExpenseService);
  isShowModal = false;

  addCategory() {
    this.isShowModal = true;
  }

  closeModal() {
    this.isShowModal = false;
  }
}
