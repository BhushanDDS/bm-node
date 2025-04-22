import { Body, Controller, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemnerDto } from './dto/create-member-dto';

@Controller('member')
export class MemberController {

    constructor(private memberService:MemberService){}

    @Post('member')
    createmember(@Body() memberdto:CreateMemnerDto){
        return this.memberService.createMember(memberdto);
    }
}
