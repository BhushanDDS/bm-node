import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from 'src/dto/ProfileDto';

@Controller('profile')
export class ProfileController {
    constructor(private profileservice: ProfileService) {}


    @Get('profiles')
    getAllProfiles(){
        return this.profileservice.getAllProfiles();
    }


    @Post('create-profile')
    createUser(@Body() ProfileDto:ProfileDto){
        return this.profileservice.createProfile(ProfileDto)

    }

    @Get(':id')
    getProfile(@Param("id")id:any){
        return this.profileservice.getProfileForUser(id);
    }

    @Delete('delete-profile/:id')
    deleteProfileById(@Param("id")id:any){
        return this.profileservice.deleteProfileById(id);

    }

    @Put('update-profile/:id')
    updateProfileById(@Param('id') id: string, @Body() profileDto: ProfileDto) {
      return this.profileservice.updateProfileById(parseInt(id), profileDto);
    }
    
}
