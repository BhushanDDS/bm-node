import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { SighnUpDto } from './dto/signup.user';
import { sign } from 'crypto';
import { SignInDto } from './dto/signin.user';

@Controller('user')
export class UserController {


    constructor(private userservices:UserService){}


    @Post('signup')
    registerUser(@Body() SighnUpDto:SighnUpDto){

        return this.userservices.registerUser(SighnUpDto);
        
    }



    @Post('signin')
    loginUser(@Body() SignInDto:SignInDto){
        return this.userservices.loginuser(SignInDto)
    }


}
