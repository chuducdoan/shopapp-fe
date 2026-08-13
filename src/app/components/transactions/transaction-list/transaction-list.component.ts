import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ExpenseService } from '../../../services/expense.service';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';
import { Transaction } from '../../../models/transaction.model';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, TransactionFormComponent],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.css'
})
export class TransactionListComponent {
  expenseService = inject(ExpenseService);
  
  showForm = false;
  selectedTx?: Transaction;

  getCategoryName(id: string) {
    return this.expenseService.categories().find(c => c.id === id)?.name || 'Không rõ';
  }

  getCategoryIcon(id: string) {
    return this.expenseService.categories().find(c => c.id === id)?.icon || '❔';
  }

  openForm() {
    this.selectedTx = undefined;
    this.showForm = true;
  }

  editTx(tx: Transaction) {
    this.selectedTx = tx;
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.selectedTx = undefined;
  }

  deleteTx(id: string) {
    if (confirm('Bạn có chắc chắn muốn xóa giao dịch này?')) {
      this.expenseService.deleteTransaction(id);
    }
  }
}
