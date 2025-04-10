import { Body, Controller, Get, Param, ParseBoolPipe, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { TrimPipe } from 'src/common/pipes/trim.pipe';
import { upperCase } from 'src/common/pipes/upperCase.pipe';
import { jsonParse } from 'src/common/pipes/jsonParse.pipe';
import { UserAgent } from 'src/common/decoraters/user';

@Controller('user')
export class UserController {
    constructor(private userServices: UserService) {}


    @Post('getuser/:id')
    getUser(@Param('id',ParseIntPipe)id:number){
        
        return this.userServices.getById(id);
    }


    
     @Get('jsonfilter')
    filterUsers(@Query('filter', jsonParse) filter: { isActive: boolean }) {
    console.log(typeof filter);
    
    return this.userServices.getAllUsersByStatus(filter.isActive);
        }

    @Get('status')
    getUsersByStatus(@Query('isActive', ParseBoolPipe) isActive: boolean) {
        console.log(typeof isActive);
        
        return this.userServices.getAllUsersByStatus(isActive);
    }

    // @Post('add-user')
    // addUser(
    //     @Body('name',TrimPipe)name:string,
    //     @Body('isActive',ParseBoolPipe)isActive:boolean
    // ){
    //     console.log(name);
        
    //     return this.userServices.createUser(name,isActive);
    // }

    @Post('add-user')
    addUser(
        @Body('name',upperCase)name:string,
        @Body('isActive',ParseBoolPipe)isActive:boolean
    ){
        console.log(name);
        
        return this.userServices.createUser(name,isActive);
    }


    @Get('info')
    getUserInfo(@UserAgent() userAgent: string) {
      console.log('User-Agent:', userAgent);
  
      return {
        message: 'User info fetched successfully',
        userAgent,
      };
    }
}
