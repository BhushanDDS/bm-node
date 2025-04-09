import { Injectable } from '@nestjs/common';
import { flushCompileCache } from 'module';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
        constructor(private userService: UserService) {}
    


    private authenticatedUsrs=[
       
    ]


    verify(id:any){
        const user=this.userService.findUserById(id)
        if(!user){
            return  `User Does Not Exists`
        }
        this.authenticatedUsrs.forEach((user)=>{
            if(user.id==id){
                user.isauthenticated=true
            }
        })
        const newObj={
            id,
            isauthenticated:true
        }
        this.authenticatedUsrs.push(newObj)
        return {messahe:"user verified",newObj}

    }


    getauth(){
        return this.authenticatedUsrs
    }


    isVarified(id:any):boolean{
       const res=this.authenticatedUsrs.find((user)=>user.id==id);
       if(res) return true;

       return false;
    }
}
