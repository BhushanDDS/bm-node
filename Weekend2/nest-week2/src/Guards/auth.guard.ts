import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

export class AuthGurard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req= context.switchToHttp().getRequest();
        const {isAuth}=req.body;

        if(!isAuth){
            return false;
        }

        return true;
        
        
    }

}