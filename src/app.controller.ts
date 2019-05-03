import { Get, Controller, Req, Res, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from "express";
import { UserService } from './common/user/user.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly userService: UserService
    ) { }

    @Post("login")
    getToken(@Req() req: Request): string {
        const result = this.userService.getTokenUser(req.body);
        //console.log(result);
        //res.json(result);
        return JSON.stringify(result);
    }

    @Get("signin")
    signIn(@Req() req: Request, @Res() res: Response): void {
        res.render('login', {
            title: 'home!'
        });
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
