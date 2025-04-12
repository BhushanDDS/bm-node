import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Timeout } from 'src/commons/decorators/timeout.decorator';
import { IsEven } from 'src/commons/pipes/iseven.pipe';
import { CreateUserDto } from 'src/dto/createUserDto';
import { CustomValidatorDto } from 'src/dto/customValDto';

@Controller('user')
export class UserController {


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
    @Timeout(2000)
    async getTest(): Promise<string> {
      await new Promise(resolve => setTimeout(resolve, 5000));
      return 'This will timeout';
    }


    @Post('iseven/:number')
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


    
}
