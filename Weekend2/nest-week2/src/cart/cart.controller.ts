import { Body, Controller, Param, Post } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) {}

    @Post('create')
    createCart() {
      const cartId = this.cartService.createCart();
      return { cartId };
    }
   
    @Post(':cartId/add')
    addToCart(@Param('cartId') cartId: string, @Body() item: any) {
      this.cartService.addItem(cartId, item);
      return { message: 'Item added to cart' };
    }

    @Post('get-cart/:id')
    getCartItmes(@Param('id')id:string){
      return this.cartService.getItems(id)
    }

}
