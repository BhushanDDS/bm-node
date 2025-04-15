// timeout.interceptor.ts
import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    RequestTimeoutException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Observable, throwError, timeout, catchError } from 'rxjs';
  import { TIMEOUT_KEY } from './timeout.decorator';
  
  @Injectable()
  export class TimeoutInterceptor implements NestInterceptor {
    constructor(private reflector: Reflector) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const delay = this.reflector.get<number>(TIMEOUT_KEY, context.getHandler());
  console.log(delay);
  
      if (!delay) {
        return next.handle(); 
      }

  
      return next.handle().pipe(
        timeout(delay), 
        catchError(() => throwError(() => new RequestTimeoutException('Request timed out'))),
      );
    }
  }
   