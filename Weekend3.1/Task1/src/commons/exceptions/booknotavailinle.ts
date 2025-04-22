import { HttpException, HttpStatus } from '@nestjs/common';

export class BookNotAvailableException extends HttpException {
  constructor() {
    super('Book not available', HttpStatus.NOT_FOUND);
  }
}
