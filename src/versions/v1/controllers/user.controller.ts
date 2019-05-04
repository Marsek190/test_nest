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
        // first way
        // Promise
        //     .resolve(req.body)
        //     .then(this.userService.getTokenUser)        
        //     .then(result => {
        //         req.session.jsonResult = result;
        //         res.redirect('token');
        //     })
        //     .catch(({ message }) => {
        //         res.cookie('error', message, { maxAge: 1000, httpOnly: true });
        //         res.setHeader('Content-Type', 'application/json; charset=utf-8');
        //         res.send(301).json({ message });
        //     });
        //     or
        //     .catch(next);
        // second way
        try {
            console.log(req.body);
            const result = await this.userService.getTokenUser(req.body);
            // maybe can use express-flash
            req.session.jsonResult = result;
            res.redirect('token');
        } catch ({ message }) {
            // по-хорошему нужно отдать куку клиенту на фронт
            //console.log(message);
            // immitation flash input
            res.cookie('error', message, { maxAge: 1000, httpOnly: true });
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.json({ message });
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
