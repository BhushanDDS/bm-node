import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from 'src/dto/UserDto';
import { ProfileDto } from 'src/dto/ProfileDto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('users')
    getAllusers(){
        return this.userService.allUsers()
    }


    @Post('create-user')
    createUser(@Body() UserDto: UserDto){
        return this.userService.createUser(UserDto.name)
    }

    @Post('get-user/:id')
    findById(@Param("id")id:string){
        return this.userService.findUserById(id);
    }


    @Delete('delete-user/:id')
    deleteUser(@Param("id")id:string){
        return this.userService.deleteUserByid(id);
    }

  

  @Patch('update-user/:id')
  updateUser(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.userService.updateUserByid(parseInt(id), userDto.name);
  }



}
