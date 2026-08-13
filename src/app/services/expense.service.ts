import { Injectable, signal, computed, effect } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { Category } from '../models/category.model';
import { Budget } from '../models/budget.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  // Default Categories
  private defaultCategories: Category[] = [
    { id: '1', name: 'Lương', type: 'income', icon: '💰', color: '#10B981' },
    { id: '2', name: 'Thưởng', type: 'income', icon: '🎁', color: '#34D399' },
    { id: '3', name: 'Ăn uống', type: 'expense', icon: '🍔', color: '#EF4444' },
    { id: '4', name: 'Đi lại', type: 'expense', icon: '🚗', color: '#F59E0B' },
    { id: '5', name: 'Mua sắm', type: 'expense', icon: '🛒', color: '#3B82F6' },
    { id: '6', name: 'Hóa đơn', type: 'expense', icon: '🧾', color: '#8B5CF6' },
  ];

  // Signals for state management
  categories = signal<Category[]>(this.loadCategories());
  transactions = signal<Transaction[]>(this.loadTransactions());
  budgets = signal<Budget[]>(this.loadBudgets());

  // Computed values for Dashboard
  totalIncome = computed(() => {
    return this.transactions()
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  totalExpense = computed(() => {
    return this.transactions()
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  // tự động tính lại khi totalIncome hoặc totalExpense thay đổi
  balance = computed(() => this.totalIncome() - this.totalExpense());

  constructor() {
    // Tự động lưu vào localStorage mỗi khi signals thay đổi
    effect(() => {
      localStorage.setItem('em_categories', JSON.stringify(this.categories()));
      localStorage.setItem('em_transactions', JSON.stringify(this.transactions()));
      localStorage.setItem('em_budgets', JSON.stringify(this.budgets()));
    });
  }

  // --- LocalStorage Helpers ---
  private loadCategories(): Category[] {
    const saved = localStorage.getItem('em_categories');
    return saved ? JSON.parse(saved) : [...this.defaultCategories];
  }

  private loadTransactions(): Transaction[] {
    const saved = localStorage.getItem('em_transactions');
    return saved ? JSON.parse(saved) : [];
  }

  private loadBudgets(): Budget[] {
    const saved = localStorage.getItem('em_budgets');
    return saved ? JSON.parse(saved) : [];
  }

  // --- CRUD Transactions ---
  addTransaction(transaction: Omit<Transaction, 'id'>) {
    const newTransaction: Transaction = {
      ...transaction,
      id: crypto.randomUUID(),
    };
    this.transactions.update((txs) => [newTransaction, ...txs]);
  }

  updateTransaction(updatedTransaction: Transaction) {
    this.transactions.update((txs) =>
      txs.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t)),
    );
  }

  deleteTransaction(id: string) {
    this.transactions.update((txs) => txs.filter((t) => t.id !== id));
  }

  // --- CRUD Budgets ---
  setBudget(budget: Omit<Budget, 'id'>) {
    this.budgets.update((bs) => {
      const existingIndex = bs.findIndex((b) => b.month === budget.month && b.year === budget.year);
      if (existingIndex > -1) {
        const updated = [...bs];
        updated[existingIndex] = { ...updated[existingIndex], amount: budget.amount };
        return updated;
      }
      return [...bs, { ...budget, id: crypto.randomUUID() }];
    });
  }

  getBudgetForMonth(month: number, year: number): Budget | undefined {
    return this.budgets().find((b) => b.month === month && b.year === year);
  }

  addCategory(category: Omit<Category, 'id'>) {
    const newCategory: Category = {
      ...category,
      id: crypto.randomUUID(),
    };
    this.categories.update((cats) => [...cats, newCategory]);
  }
}
