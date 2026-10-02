import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private url = `${environment.apiBaseUrl}/categories`;
 
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.url}`);
  }
}
