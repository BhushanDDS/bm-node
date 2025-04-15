import { Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGurard } from 'src/Guards/auth.guard';
import { AuthService } from './auth.service';
import { SuperAdminGuard } from 'src/Guards/superadmin.guard';
import { RolesGuard } from 'src/Guards/role.guard';
import { Role } from 'src/Guards/role.enum';
import { Roles } from 'src/Guards/roles.decorator';

@Controller('auth')
export class AuthController {
constructor(private authservice:AuthService){}
@Post('login')
@UseGuards(AuthGurard)
login(){
return `Login successfull`
}

@Post('generateToken')
@UseGuards(AuthGurard)
genraateToken(){
return this.authservice.generateSuperAdminToken("test","1234")
}



@Delete('delete-all')
@UseGuards(SuperAdminGuard)
deleteArchiver(){
    return `all archives deleted`
}



@Get('get-admin')
@Roles(Role.User)
chkRole(){
    return `this role exists so we can go forward `
}


}

