import { HostListener, Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';
declare var Razorpay: any;

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  form: any = {};
  paymentId: string;
  error: string;
  message: any = 'Transaction Not Yet Started....';

  constructor(private orderService: OrderService, private router: Router) {}

  options = {
    key: 'rzp_test_W012pwfqhf3ONz',
    amount: '500',
    name: 'Insurance ',
    description: 'Policies',
    image: 'assets/imgs/flash-logo-png.png',
    order_id: '',
    handler: function (response) {
      var event = new CustomEvent('payment.success', {
        detail: response,
        bubbles: true,
        cancelable: true,
      });
      alert('Congrates !! Payment Successful !!');
      window.dispatchEvent(event);
    },
    prefill: {
      name: '',
      email: '',
      contact: '',
    },
    notes: {
      address: '',
    },
    theme: {
      color: '#3399cc',
    },
  };

  onSubmit(): void {
    this.paymentId = '';
    this.error = '';
    this.orderService.createOrder(this.form).subscribe(
      (data) => {
        this.options.key = data.secretKey;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; //paise
        this.options.prefill.name = this.form.name;
        this.options.prefill.email = this.form.email;
        this.options.prefill.contact = this.form.phone;
        var rzp1 = new Razorpay(this.options);
        rzp1.open();

        rzp1.on('payment.failed', function (response) {
          // Todo - store this information in the server
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
          this.error = response.error.reason;
          alert('Sorry!! Payment Failed !!');
        });
      },
      (err) => {
        this.error = err.error.message;
      }
    );
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event): void {
    this.message = 'Success Payment ... Policy purchased Successfully.';
    this.orderService.updateOrder(event.detail).subscribe(
      (data) => {
        this.paymentId = data.message;
      },
      (err) => {
        this.error = err.error.message;
      }
    );
  }
  ngOnInit(): void {}
}
