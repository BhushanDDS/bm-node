import { BadRequestException, CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { catchError, Observable, tap, throwError, timeout } from "rxjs";
import { key } from "./demoMatadat";


@Injectable()
export class LoggerInterseptor implements NestInterceptor{
    constructor(private Reflector:Reflector){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        const request= context.switchToHttp().getRequest();
        console.log(`req:${request.url } - ${request.method}  here `);
        
        const data = this.Reflector.get<number>(key,context.getHandler());
     

        return next.handle().pipe(

           tap(()=>console.log(`after exicution wiht data  ${data}`)
           )

        )

        
    }

}