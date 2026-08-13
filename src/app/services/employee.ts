import { Injectable } from '@angular/core';
import { IEmployee } from '../models/IEmployee.model';
import { genders, departments, positions } from '../constants/data';

@Injectable({
  providedIn: 'root',
})
export class Employee {
  private employees: IEmployee[] = [
    {
      id: 1,
      name: 'Nguyễn Văn A',
      gender: 1,
      dateOfBirth: new Date('1990-01-01'),
      department: 1,
      position: 1,
      salary: 10000000,
    },
    {
      id: 2,
      name: 'Nguyễn Văn B',
      gender: 2,
      dateOfBirth: new Date('1990-01-01'),
      department: 2,
      position: 2,
      salary: 10000000,
    },
  ];

  getEmployees(): IEmployee[] {
    return this.employees;
  }

  getEmployeeById(id: number): IEmployee {
    return this.employees.find((employee) => employee.id === Number(id))!;
  }

  addEmployee(employee: IEmployee): void {
    this.employees.push(employee);
  }

  getGender(gender: number) {
    return genders.find((g) => g.id === gender)?.name;
  }

  getDepartment(department: number) {
    return departments.find((d) => d.id === department)?.name;
  }

  getPosition(position: number) {
    return positions.find((p) => p.id === position)?.name;
  }
}
