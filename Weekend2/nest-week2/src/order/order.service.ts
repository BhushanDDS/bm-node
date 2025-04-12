import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  private orders = [];

  createOrder(cartId: string, items: any[]) {
    const order = {
      orderId: 'ORD' + Date.now(),
      cartId,
      items,
    };
    this.orders.push(order);
    return order;
  }

  getOrders() {
    return this.orders;
  }
}