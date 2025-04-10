import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    const dummyToken = 'Bearer dummy-token-123';

    if (!authHeader || authHeader !== dummyToken) {
      throw new UnauthorizedException('Unauthorized! Invalid or missing token');
    }

    next();
  }
}
