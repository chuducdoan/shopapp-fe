import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private url = `${environment.apiBaseUrl}/products`;
 
  constructor(private http: HttpClient) { }

  getAllProduct(keyword: string, categoryId: number,page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('keyword', keyword)
      .set('category_id', categoryId.toString())
      .set('page', page.toString())
      .set('limit', limit.toString())
    return this.http.get(`${this.url}`, { params });
  }

  getDetailProduct(productId: number) {
    return this.http.get(`${this.url}/${productId}`);
  }

  getProductsByIds(productIds: string) {
    const params = new HttpParams().set('ids', productIds);
    return this.http.get(`${this.url}/by-ids`, { params });
  }
}
