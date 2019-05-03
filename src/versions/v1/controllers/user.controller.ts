import { Controller, Post, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../../../common/user/user.service';

@Controller('v1/user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post("login")
    login(@Req() req: Request): string {
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
}
