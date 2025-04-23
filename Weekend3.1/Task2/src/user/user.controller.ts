import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { LoginDTO } from './dto/user-login-dto';

@Controller('user')
export class UserController {

    constructor(private userservice:UserService){}

    @Post('register')
    @UseInterceptors(ClassSerializerInterceptor)
    registerUser(@Body() CreateUserDto:CreateUserDto){
        return this.userservice.RegisterUser(CreateUserDto);
    }

    @Post('login')
    loginUser(@Body() LoginDTO:LoginDTO)
    {
        return this.userservice.LoginUser(LoginDTO);
    }


    


}
