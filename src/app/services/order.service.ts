import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
declare var Razorpay: any;
let API_URL = 'http://localhost:9594/insurance/';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(order): Observable<any> {
    return this.http.post(
      API_URL + 'order',
      {
        customerName: order.name,
        email: order.email,
        phoneNumber: order.phone,
        amount: order.amount,
      },
      httpOptions
    );
  }

  updateOrder(order): Observable<any> {
    return this.http.put(
      API_URL + 'order',
      {
        razorpayOrderId: order.razorpay_order_id,
        razorpayPaymentId: order.razorpay_payment_id,
        razorpaySignature: order.razorpay_signature,
      },
      httpOptions
    );
  }
}
