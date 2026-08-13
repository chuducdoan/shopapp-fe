import { Component, inject, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ExpenseService } from '../../services/expense.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements AfterViewInit {
  // tiêm sự phụ thuộc thay vì cách dùng cũ constructor(private expenseService: ExpenseService) {}
  expenseService = inject(ExpenseService);
  @ViewChild('expenseChart') expenseChartRef!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngAfterViewInit() {
    this.initChart();
  }

  initChart() {
    const ctx = this.expenseChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    const transactions = this.expenseService.transactions();
    const categories = this.expenseService.categories();

    // Calculate expenses by category
    const expenseData = new Map<string, number>();
    transactions.forEach((t) => {
      if (t.type === 'expense') {
        const current = expenseData.get(t.categoryId) || 0;
        expenseData.set(t.categoryId, current + t.amount);
      }
    });

    const labels: string[] = [];
    const data: number[] = [];
    const backgroundColors: string[] = [];

    expenseData.forEach((amount, categoryId) => {
      const cat = categories.find((c) => c.id === categoryId);
      if (cat) {
        labels.push(cat.name);
        data.push(amount);
        backgroundColors.push(cat.color || '#EF4444');
      }
    });

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels.length > 0 ? labels : ['Chưa có dữ liệu'],
        datasets: [
          {
            data: data.length > 0 ? data : [1],
            backgroundColor: backgroundColors.length > 0 ? backgroundColors : ['#E5E7EB'],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
          },
        },
      },
    });
  }
}
