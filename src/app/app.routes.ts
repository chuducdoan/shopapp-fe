import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TransactionListComponent } from './components/transactions/transaction-list/transaction-list.component';
import { CategoryListComponent } from './components/categories/category-list/category-list.component';
import { BudgetComponent } from './components/budget/budget.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'transactions', component: TransactionListComponent },
  { path: 'categories', component: CategoryListComponent },
  { path: 'budget', component: BudgetComponent },
  { path: '**', redirectTo: '' }
];
