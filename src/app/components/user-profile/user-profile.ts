import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { UserResponse } from '../../responses/user/user.response';
import { ValidationError } from 'class-validator';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile implements OnInit {
  userResponse!: UserResponse;
  userProfileForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: User,
    private token: TokenService,
  ) {
    this.userProfileForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', Validators.required],
      phone_number: ['', Validators.required],
      address: ['', Validators.required],
      note: ['', Validators.required],
      password: ['', Validators.required],
      retypePassword: ['', Validators.required],
      date_of_birth: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const token = this.token.getToken();
    if (token) {
      this.userService.getUserDetail(token).subscribe((user: UserResponse) => {
        this.userResponse = { ...user, date_of_birth: new Date(user.date_of_birth) };
        this.userProfileForm.patchValue({
          fullname: user?.full_name ?? '',
          phone_number: user?.phone_number ?? '',
          address: user?.address ?? '',
          date_of_birth: user?.date_of_birth
            ? new Date(user.date_of_birth).toISOString().substring(0, 10)
            : '',
        });
        this.userService.saveUserResponseToLocalStorage(this.userResponse);
      });
    }
  }

  passwordMatchValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const password = formGroup.get('password')?.value;
      const retypePassword = formGroup.get('retypePassword')?.value;

      if (password !== retypePassword) {
        return { passwordMismatch: true };
      }

      return null;
    };
  }
}
