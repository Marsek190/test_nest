import { Controller, Post, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../../../common/user/user.service';

@Controller('v1/user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Post("login")
    async login(@Req() req: Request, @Res() res: Response) {
        try {
            console.log(req.body);
            const result = await this.userService.getTokenUser(req.body);
            // maybe can use express-flash
            req.session.jsonResult = result;
            res.redirect('token');
        } catch (e) {
            // по-хорошему нужно отдать куку клиенту на фронт
            //console.log(e.message);
            // immitation flash input
            res.cookie('error', e.message, { maxAge: 1000, httpOnly: true });
            res.redirect(301, 'signin');
        }
    }

    @Get("token")
    token(@Req() req: Request, @Res() res: Response): void {
        console.log(req.session);
        res.render('user-token', {
            jsonResult: req.session.jsonResult
        });
    }

    @Get("signin")
    signIn(@Req() req: Request, @Res() res: Response): void {
        console.log(req.cookies);
        res.render('login', {
            title: 'home!'
        });
    }
}
