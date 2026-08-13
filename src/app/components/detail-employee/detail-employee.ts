import { Component, OnInit } from '@angular/core';
import { IEmployee } from '../../models/IEmployee.model';
import { Employee as EmployeeService } from '../../services/employee';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail-employee',
  imports: [CommonModule],
  templateUrl: './detail-employee.html',
  styleUrl: './detail-employee.css',
})
export class DetailEmployee implements OnInit {
  employee!: IEmployee;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.employee = this.employeeService.getEmployeeById(id);
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
