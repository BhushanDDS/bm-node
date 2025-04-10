import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VerifyApiKeyMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    const validApiKey = this.configService.get<string>('API_KEY');

    if (!apiKey || apiKey !== validApiKey) {
      throw new ForbiddenException('Forbidden: Invalid API key');
    }

    next();
  }
}
