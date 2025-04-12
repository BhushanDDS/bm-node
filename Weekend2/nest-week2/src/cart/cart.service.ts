import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CartService {
  private carts = new Map<string, any[]>();

  createCart(): string {
    const cartId = uuidv4();
    this.carts.set(cartId, []);
    return cartId;
  }

  addItem(cartId: string, item: any) {
    const cart = this.carts.get(cartId);
    if (!cart) throw new Error('Cart not found');
    cart.push(item);
  }

  getItems(cartId: string) {
    return this.carts.get(cartId) || [];
  }

  clearCart(cartId: string) {
    this.carts.set(cartId, []);
  }
}
