import { Injectable } from '@nestjs/common';
import { CreateMemnerDto } from './dto/create-member-dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {

    constructor (@InjectRepository(Member)
private memberrepo :Repository<Member>,
){}
    async createMember(memberdto: CreateMemnerDto) {
        const member = await this.memberrepo.findOne({ where: { name: memberdto.email } });
        if (member) {   
            return { message: 'Member already exists' };
        }
        const newMember = this.memberrepo.create(memberdto);
        return await this.memberrepo.save(newMember);
    }


    async getMemberById(memberid: number) {
        const member = await this.memberrepo.findOne({ where: { memberid } as any });
        if (!member) {
            throw new Error('Member not found');
        }
        return member;
    }
}
