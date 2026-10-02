import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserResponse } from '../../responses/user/user.response';
import { TokenService } from '../../services/token.service';
import { User } from '../../services/user.service';
import { LoginResponse } from '../../responses/user/login.response';
import { UserModel } from '../../models/user.model';
import { tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { login } from '../../actions/auth.action';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @ViewChild('loginForm') loginForm!: NgForm;

  userResponse?: UserResponse;
  formLogin!: FormGroup;

  constructor(
    private userService: User,
    private tokenService: TokenService,
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>,
  ) {
    this.formLogin = this.fb.group({
      phone_number: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  login() {
    const loginDTO = this.formLogin.value;
    this.userService
      .loginUser(loginDTO)
      .pipe(
        tap((user) => {
          this.store.dispatch(login({ user: user }));
          console.log(user);
        }),
      )
      .subscribe({
        next: (response: UserModel) => {
          const { token } = response;
          if (this.formLogin.get('rememberMe')?.value) {
            this.tokenService.setToken(token);
            this.userService.getUserDetail(token).subscribe({
              next: (userResponse: any) => {
                this.userResponse = {
                  id: userResponse.id,
                  phone_number: userResponse.phone_number,
                  address: userResponse.address,
                  is_active: userResponse.is_active,
                  date_of_birth: new Date(userResponse.date_of_birth),
                  facebook_account_id: userResponse.facebook_account_id,
                  google_account_id: userResponse.google_account_id,
                  role: userResponse.role,
                  full_name: userResponse.full_name,
                };
                this.userService.saveUserResponseToLocalStorage(this.userResponse);
                this.router.navigate(['/home']);
              },
              error: (error) => {
                console.log(error);
              },
            });
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
