import { Get, Controller, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from "express";
import { UserService } from './common/user/user.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly userService: UserService
    ) { }

    // /token?email=admin@admin.ru&password=12345678
    @Get("token")
    getToken(@Req() req: Request): string {
        const result = this.userService.getTokenUser(req.query);
        //console.log(result);
        //res.json(result);
        return JSON.stringify(result);
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
