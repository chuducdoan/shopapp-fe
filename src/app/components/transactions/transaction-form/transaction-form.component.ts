import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../../services/expense.service';
import { Transaction } from '../../../models/transaction.model';
import { TransactionType } from '../../../models/category.model';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css',
})
export class TransactionFormComponent implements OnInit {
  @Input() transaction?: Transaction;
  @Output() close = new EventEmitter<void>();

  expenseService = inject(ExpenseService);

  // lấy toàn bộ các thuộc tính của Transaction nhưng loại bỏ id ra
  formData: Omit<Transaction, 'id'> = {
    amount: 0,
    categoryId: '',
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
    note: '',
  };

  ngOnInit() {
    if (this.transaction) {
      this.formData = {
        amount: this.transaction.amount,
        categoryId: this.transaction.categoryId,
        type: this.transaction.type,
        date: this.transaction.date,
        note: this.transaction.note || '',
      };
    }
  }

  get availableCategories() {
    return this.expenseService.categories().filter((c) => c.type === this.formData.type);
  }

  setType(type: TransactionType) {
    this.formData.type = type;
    this.formData.categoryId = ''; // reset category when changing type
  }

  onSubmit() {
    if (this.transaction) {
      this.expenseService.updateTransaction({
        ...this.formData,
        id: this.transaction.id,
      });
    } else {
      this.expenseService.addTransaction(this.formData);
    }
    this.close.emit();
  }
}
