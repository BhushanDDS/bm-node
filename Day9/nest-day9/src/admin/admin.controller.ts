import { Controller, Get, Post } from '@nestjs/common';

@Controller('admin')
export class AdminController {

@Get('get-admin')
getAdmin(){
    return  `get admin called`
}

@Post('post-admin')
postAdmin(){
    return `postadmin called`
}


@Get('reports')
getReports(){
    return `admin returns reports`
}

}
