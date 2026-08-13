import { TransactionType } from './category.model';

export interface Transaction {
  id: string;
  amount: number;
  categoryId: string;
  type: TransactionType;
  date: string; // ISO string format YYYY-MM-DD
  note?: string;
}
