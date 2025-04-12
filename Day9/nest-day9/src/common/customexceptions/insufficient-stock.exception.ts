import { HttpException, HttpStatus } from '@nestjs/common';

export class InsufficientStockException extends HttpException {
  constructor(productId: string) {
    super(`Insufficient stock for product ${productId}`, HttpStatus.BAD_REQUEST);
  }
}
