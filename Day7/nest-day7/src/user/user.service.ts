import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
 private Users=[{
    id:1,
    username:"DEMO"

}]


deleteUserByid(id){
    return this.Users=this.Users.filter((user)=>user.id!=id);
}

updateUserByid(id: number, name: string) {
    const user = this.Users.find((user) => user.id === id);
    if (user) {
      user.username = name;
      return { message: 'User updated successfully', user };
    } else {
      return { message: 'User not found' };
    }
  }
createUser(name:string){
    const newUser = { id: this.Users.length, username:name };
    this.Users.push(newUser);
    return newUser;
}

findUserById(id:any){
        return this.Users.find((user)=>user.id==id);
    
}

allUsers(){
    return this.Users
}





}
