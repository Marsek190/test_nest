import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserTokenService } from './token/user-token.service';

describe('UserService', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            providers: [
                UserService,
                UserTokenService,
            ]
        }).compile();
    });

    const OK = {
        email: 'admin@admin.ru',
        password: '12345678'
    };

    const ERR = {
        email: 'aaa@aaa.ru',
        password: '1111111'
    };

    const BAD_RES = {
        statusCode: 401,
        error: "Unauthorized"
    };

    const EMPTY = {
        email: '',
        password: ''
    };

    describe('findUser', () => {
        it('should be exception', () => {
            const userService = app.get<UserService>(UserService);
            expect(userService.findUser(EMPTY)).rejects.toThrowError('incorrect email or password');
        });
        it('should be user', () => {
            const userService = app.get<UserService>(UserService);
            expect(userService.findUser(OK)).resolves.toBeDefined();
            expect(userService.findUser(OK)).resolves.not.toThrowError('incorrect email or password');
        });
        it('should be undefined', () => {
            const userService = app.get<UserService>(UserService);
            expect(userService.findUser(OK)).resolves.not.toThrowError('incorrect email or password');
            expect(userService.findUser(ERR)).resolves.not.toBeDefined();
        });
    });

    describe('getToken', () => {
        it('should be exception', () => {
            const userService = app.get<UserService>(UserService);
            expect(userService.getTokenUser(EMPTY)).rejects.toThrowError(Error);
        });
        it('should be token', () => {
            const userService = app.get<UserService>(UserService);
            expect(userService.getTokenUser(OK)).resolves.not.toThrowError(Error);
            expect(userService.getTokenUser(OK)).resolves.not.toEqual(BAD_RES);
        });
        it('should be return error', () => {
            const userService = app.get<UserService>(UserService);
            expect(userService.getTokenUser(OK)).resolves.not.toThrowError(Error);
            expect(userService.getTokenUser(ERR)).resolves.toEqual(BAD_RES);
        });
    });
});