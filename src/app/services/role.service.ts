import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private url = `${environment.apiBaseUrl}/roles`;
  private apiConfig = {
    headers: this.createHeaders()
  }

  constructor(private http: HttpClient) { }

  getRoles(): Observable<any> {
    return this.http.get(this.url, this.apiConfig);
  }

  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept-Language': 'vi'
    });
  }
}
