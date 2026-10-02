import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterDTO } from '../../dtos/user/register.dto';
import { User } from '../../services/user.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule ,CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  @ViewChild("registerForm") registerForm!: NgForm;
  phone:string = ""
  password:string = ""
  confirmPassword:string = ""
  fullname:string = ""
  address:string = ""
  isAccepted: boolean = false;
  dateOfBirth: Date = new Date();

  constructor(private router: Router, private userService: User ) {
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear()-18);
  }

  register() {
    const body: RegisterDTO = {
      fullname:  this.fullname,
      phone_number:  this.phone ? Number(this.phone) : 0,
      address:  this.address,
      password:  this.password,
      retype_password: this.confirmPassword,
      date_of_birth:  this.dateOfBirth,
      facebook_account_id: 0,
      google_account_id: 0,
      role_id: 1
    }
    this.userService.registerUser(body).subscribe({
      next: (res: any) => {
        console.log('Đăng ký thành công:', res);
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Lỗi đăng ký:', err);
        alert(err.error?.message || err.message || 'Đăng ký thất bại, vui lòng kiểm tra lại!');
      }
    });
  }

  checkPasswordMatch() {
    const confirmControl = this.registerForm?.form?.controls['confirmPassword'];
    if (confirmControl) {
      if (this.password !== this.confirmPassword) {
        confirmControl.setErrors({ passwordMismatch: true });
      } else {
        confirmControl.setErrors(null);
      }
    }
  }

  checkAge() {
    if (this.dateOfBirth) {
      const today = new Date();
      const birthDate = new Date(this.dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      const dobControl = this.registerForm?.form?.controls['dateOfBirth'];
      if (dobControl) {
        if (age < 18) {
          dobControl.setErrors({ ageNotValid: true });
        } else {
          dobControl.setErrors(null);
        }
      }
    }
  }
}
