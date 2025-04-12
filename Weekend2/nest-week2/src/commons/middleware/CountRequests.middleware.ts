import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requestCounts = new Map<string, { count: number; firstRequestTime: number }>();
  private readonly LIMIT = 3; 
  private readonly WINDOW_MS = 60 * 1000; 

  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;
    const now = Date.now();

    const ipData = this.requestCounts.get(ip);

    if (!ipData) {
      this.requestCounts.set(ip, { count: 1, firstRequestTime: now });
      return next();
    }

    const { count, firstRequestTime } = ipData;

    if (now - firstRequestTime < this.WINDOW_MS) {
      if (count >= this.LIMIT) {
        throw new BadRequestException('Rate limit exceeded: 3 requests per minute allowed.');
      }

      this.requestCounts.set(ip, { count: count + 1, firstRequestTime });
      return next();
    }
    this.requestCounts.set(ip, { count: 1, firstRequestTime: now });
    return next();
  }
}
