import { Component, EventEmitter, inject, Output } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../../services/expense.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-category-form',
  imports: [FormsModule],
  templateUrl: './category-form.html',
  styleUrl: './category-form.css',
})
export class CategoryForm {
  @Output() close = new EventEmitter<void>();

  formData: Omit<Category, 'id'> = {
    name: '',
    type: 'expense',
    icon: '',
    color: '',
  };

  expenseService = inject(ExpenseService);

  onSubmit() {
    this.expenseService.addCategory(this.formData);
    this.close.emit();
  }
}
