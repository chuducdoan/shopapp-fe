import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employee as EmployeeService } from '../../services/employee';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { departments, positions, genders } from '../../constants/data';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee {
  employee: FormGroup;

  departments = departments;
  positions = positions;
  genders = genders;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
  ) {
    this.employee = this.fb.group({
      name: [null, Validators.required],
      gender: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      department: [null, Validators.required],
      position: [null, Validators.required],
      salary: [null, Validators.required],
    });
  }

  addEmployee() {
    if (this.employee.invalid) {
      // Hàm markAllAsTouched() của Angular Form rất thần thánh trong trường hợp này.
      // Nó sẽ bắt buộc toàn bộ input ngầm chuyển trạng thái sang touched.
      // Ngay lập tức, tất cả các điều kiện *ngIf ngoài HTML của bạn trở thành đúng và
      // chữ màu đỏ sẽ hiện lên đồng loạt nhắc nhở người dùng nhập liệu! Bạn thử ra ngoài bấm lại thử nhé.
      this.employee.markAllAsTouched();
      return;
    }
    const formValue = this.employee.value;
    
    const newEmployee = {
      ...formValue,
      id: this.employeeService.getEmployees().length + 1,
      salary: Number(formValue.salary),
      dateOfBirth: new Date(formValue.dateOfBirth),
      gender: Number(formValue.gender),
      department: Number(formValue.department),
      position: Number(formValue.position),
    };

    this.employeeService.addEmployee(newEmployee);
    this.router.navigate(['/list-employee']);
  }
}
