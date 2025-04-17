import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register-user-dto';
import { LoginDTO } from './dto/login-user-dto';
import { SuperAdminGuard } from 'src/common/guards/admin.auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authservice:AuthService){}


    @Post('register')
    registerUser(@Body() registerdto:RegisterDTO){
        return this.authservice.register(registerdto);

    }

    @Post('login')
    loginUser(@Body() logindto:LoginDTO){
        return this.authservice.login(logindto)

    }

    @UseGuards(SuperAdminGuard)
    @Post('validate/:id')
    validateUser(@Param('id',ParseIntPipe) id:number){
        return this.authservice.validateUser(id);
    }



}
