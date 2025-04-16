import { Body, Controller, Get, Param, ParseIntPipe, Post,Headers, UseInterceptors } from '@nestjs/common';
import { Timeout } from 'src/commons/decorators/timeout.decorator';
import { DemoMeta } from 'src/commons/interceptors/demoMatadat';
import { IsEven } from 'src/commons/pipes/iseven.pipe';
import { CreateEmploymentDto } from 'src/dto/createEmpDto';
import { CreateUserDto } from 'src/dto/createUserDto';
import { CustomValidatorDto } from 'src/dto/customValDto';
import { UserService } from './user.service';
import { LoggerInterseptor } from 'src/commons/interceptors/Loogr.interceptor';

@Controller('user')
export class UserController {

  constructor(private userservice:UserService){}



    @Get(':id/role/:role')
    getByRole(@Param('id')id:number,@Param('role')role:string){
        try {
            if(role==='admin'){
                return `Hi admin here with id ${id}`
            }
            if(role==='user'){
                return `Hi user here with id ${id}`
            }
        } catch (error) {
            throw error;
        }
        
    }

    @Get('timeout')
    //@UseInterceptors()
    @Timeout(2000)
    async getTest(): Promise<string> {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return 'This will timeout';
    }


    @Post('iseven/:number')
    @DemoMeta(2)
    chkNumber(@Param('number' ,ParseIntPipe,IsEven)number:number){
        return `its even`;
        
    }

    @Get('limit')
    chkLimit(){
        return `limit hit`
    }

    @Post('create-user')
    creatUser(@Body() CreateUserDto:CreateUserDto){
        return `User created`;
    }

    @Post('create-about')
    createAbout(@Body() CustomValidatorDto:CustomValidatorDto){
        return `about posted succesfully`
    }

    @Post('employment')
    createEmployment(
      @Body() body: CreateEmploymentDto,
      @Headers('x-country-code') countryCode: string,
    ) {
      // Attach the country code to the request body
      if (body.contractorDetails) {
        body.contractorDetails.headers = {
          'x-country-code': countryCode || 'US', // Default to US if no country code
        };
      }
    
      return {
        message: 'Valid payload received!',
        data: body,
      };
    }



    @Get('interseptlogger')
    @UseInterceptors(LoggerInterseptor)
    testInterceptor(){
      
      return this.userservice.sendResponse();
    }
  
  

}