import { Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authservices: AuthService) {}


    @Post('verify/:id')
    verifyUser(@Param("id")id:string){
        return this.authservices.verify(id);

    }

    @Get('get-auth')
    getAllAuth(){
        return this.authservices.getauth();
    }

    @Post('isverified/:id')
    isVerified(@Param("id")id:string){
        return this.authservices.isVarified(id);
    }
}
