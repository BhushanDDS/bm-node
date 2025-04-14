import { BadRequestException, CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { catchError, map, Observable, tap, throwError, timeout } from "rxjs";


@Injectable()
export class LoggerInterseptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request= context.switchToHttp().getRequest();
        const timestamp=new Date().toISOString();
        console.log(`req:${request.url } - ${request.method}  here  on ${timestamp}`);   
        return next.handle().pipe(
            map((data) => {
              if (Array.isArray(data)) {
                return data.map((item) => item.toString());
              }
              return data;
            })
          );   
    }
}