import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environments/environments';
import { UserResponse } from '../responses/user/user.response';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class User {
  private url = `${environment.apiBaseUrl}/users/register`;
  private apiLogin = `${environment.apiBaseUrl}/users/login`;
  private apiUserDetail = `${environment.apiBaseUrl}/users/details`;
  private apiConfig = {
    headers: this.createHeaders(),
  };

  private userResponseSubject = new BehaviorSubject<UserResponse | null>(
    this.getUserResponseFromLocalStorage(),
  );
  public userResponse$ = this.userResponseSubject.asObservable();

  constructor(private http: HttpClient) {}

  registerUser(registerData: RegisterDTO): Observable<any> {
    return this.http.post(this.url, registerData, this.apiConfig);
  }

  // loginUser(loginData: LoginDTO): Observable<any> {
  //   return this.http.post(this.apiLogin, loginData, this.apiConfig);
  // }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi',
    });
  }

  getUserDetail(token: string): Observable<any> {
    return this.http.get(`${this.apiUserDetail}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  saveUserResponseToLocalStorage(userResponse: UserResponse): void {
    try {
      if (userResponse == null || !userResponse) {
        return;
      }
      const userResponseString = JSON.stringify(userResponse);
      localStorage.setItem('user', userResponseString);
      this.userResponseSubject.next(userResponse);
    } catch (error) {
      console.log(error);
    }
  }

  getUserResponseFromLocalStorage(): UserResponse | null {
    try {
      const userResponseString = localStorage.getItem('user');
      if (userResponseString == null || !userResponseString) {
        return null;
      }
      return JSON.parse(userResponseString);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  removeUserResponseFromLocalStorage(): void {
    try {
      localStorage.removeItem('user');
      this.userResponseSubject.next(null);
    } catch (error) {
      console.log(error);
    }
  }

  loginUser(loginData: LoginDTO): Observable<UserModel> {
    return this.http.post<UserModel>(this.apiLogin, loginData, this.apiConfig);
  }
}
