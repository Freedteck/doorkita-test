import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);

  baseUrl = 'http://localhost:8080';

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/orders`);
  }

  getOrderById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/orders/${id}`);
  }

  getOrdersByPatient(patientId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/orders?patientId=${patientId}`
    );
  }

  getTestTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/testTypes`);
  }

  getOrdersByDoctor(doctorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/orders?doctorId=${doctorId}`);
  }

  createOrder(order: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/orders`, order);
  }

  updateOrder(id: string, order: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/orders/${id}`, order);
  }

  updateOrderStatus(
    orderId: string,
    status: 'PENDING' | 'COMPLETED'
  ): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}/orders/${orderId}`, {
      status,
    });
  }

  deleteOrder(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/orders/${id}`);
  }

  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users?role=doctor`);
  }

  constructor() {}
}
