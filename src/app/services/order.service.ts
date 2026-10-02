import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { Observable } from 'rxjs';
import { OrderDTO } from '../dtos/order/order.dto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = `${environment.apiBaseUrl}/orders`;
 
  constructor(private http: HttpClient) { }

  createOrder(order: OrderDTO): Observable<any> {
    return this.http.post(`${this.url}`, order);
  }

  getOrder(orderId: number): Observable<any> {
    return this.http.get(`${this.url}/${orderId}`);
  }
}
