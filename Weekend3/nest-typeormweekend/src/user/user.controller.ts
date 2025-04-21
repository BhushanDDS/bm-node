import { Body, Controller, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SighnUpDto } from './dto/signup.user';
import { sign } from 'crypto';
import { SignInDto } from './dto/signin.user';
import { Response,Request } from 'express';
import { DoctorGuard } from 'src/GlobalGuards/DoctorGuard';
import { AuthGuard } from 'src/GlobalGuards/AuthGurd';
@Controller('user')
export class UserController {


    constructor(private userservices:UserService){}


    @Post('signup')
    registerUser(@Body() SighnUpDto:SighnUpDto){

        return this.userservices.registerUser(SighnUpDto);
        
    }



    @Post('signin')
  async loginUser(
    @Body() dto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.userservices.loginuser(dto);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true, 
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { message:"Login Sussesfull",accessToken ,refreshToken};
  }
  @Post('refresh')
  async refresh(@Req() req: Request) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) throw new UnauthorizedException('No refresh token');

        return this.userservices.refreshToken(refreshToken);
    }


    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Req() req: Request, @Res() res: Response) {
        const refreshToken = req.cookies['refresh_token'];
        if (!refreshToken) throw new UnauthorizedException('No refresh token');
        await this.userservices.logout(refreshToken);
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: true, 
            sameSite: 'strict',
        });
        return res.json({ message: 'Logout successful' });
      
      }

    


}
