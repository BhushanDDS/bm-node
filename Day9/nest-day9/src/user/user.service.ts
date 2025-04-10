import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    private users=[{
        id:1,
        name:"user1",
        isActive:false
    },{
        id:2,
        name:"user2",
        isActive:true
    },{
        id:3,
        name:"user3",
        isActive:true
    },{
        id:4,
        name:"user4",
        isActive:false
    }]


    getById(id:number){
        const user = this.users.find((user)=>user.id===id);
        return {"message":"Found User" , user}
    }

    getAllUsersByStatus(status:boolean){
        const acusers= this.users.filter((user)=>user.isActive===status)
        return {"message":"all users by status",acusers}
    }


    createUser(name: string, isActive: boolean) {
        const newUser = {
          id: this.users.length + 1,
          name,
          isActive,
        };
        this.users.push(newUser);
        return {
          message: 'User created successfully',
          user: newUser,
        };
      }
}
