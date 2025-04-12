import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post()
  pay(@Body('cartId') cartId: string) {
    const order = this.paymentService.processPayment(cartId);
    return {
      message: 'Payment successful. Order confirmed.',
      order,
    };
  }
} 