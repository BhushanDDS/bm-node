import { CartService } from '../cart/cart.service';
import { OrderService } from '../order/order.service';
import { InsufficientStockException } from '../commons/insufficient-stock.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentService {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  processPayment(cartId: string) {
    const items = this.cartService.getItems(cartId);
    if (!items || items.length == 0) {
      throw new InsufficientStockException('all');
    }

    const order = this.orderService.createOrder(cartId, items);
    this.cartService.clearCart(cartId);
    return order;
  }
}