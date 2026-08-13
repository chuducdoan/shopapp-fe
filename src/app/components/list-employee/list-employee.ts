import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployee } from '../../models/IEmployee.model';
import { Employee as EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-list-employee',
  imports: [CommonModule],
  templateUrl: './list-employee.html',
  styleUrl: './list-employee.css',
})
export class ListEmployee implements OnInit {
  employees: IEmployee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
  }

  detailEmployee(id: number) {
    this.router.navigate(['/detail-employee', id]);
  }

  getGender(gender: number) {
    return this.employeeService.getGender(gender);
  }

  getDepartment(department: number) {
    return this.employeeService.getDepartment(department);
  }

  getPosition(position: number) {
    return this.employeeService.getPosition(position);
  }
}
