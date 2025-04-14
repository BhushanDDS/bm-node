import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {


    sendResponse(){
        return [1,2,3,4,5];
    }
}
