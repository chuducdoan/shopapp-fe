import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './budget.component.html',
  styleUrl: './budget.component.css'
})
export class BudgetComponent {
  expenseService = inject(ExpenseService);
  
  date = new Date();
  currentMonth = this.date.getMonth() + 1;
  currentYear = this.date.getFullYear();
  
  isEditing = false;
  editAmount = 0;

  get currentBudget() {
    return this.expenseService.getBudgetForMonth(this.currentMonth, this.currentYear);
  }

  get progressPercentage() {
    const budget = this.currentBudget;
    if (!budget || budget.amount === 0) return 0;
    return (this.expenseService.totalExpense() / budget.amount) * 100;
  }

  ngOnInit() {
    this.editAmount = this.currentBudget?.amount || 0;
  }

  saveBudget() {
    this.expenseService.setBudget({
      amount: this.editAmount,
      month: this.currentMonth,
      year: this.currentYear
    });
    this.isEditing = false;
  }
}
