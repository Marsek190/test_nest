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

    describe('findUser', () => {
        it('should be user', () => {
            const userService = app.get<UserService>(UserService);
            const data = {
                email: 'admin@admin.ru',
                password: '12345678'
            };
            expect(userService.findUser(data)).toBeDefined();
        });
        it('should be undefined', () => {
            const userService = app.get<UserService>(UserService);
            const data = {
                email: 'aaa@aaa.ru',
                password: '1111111'
            };
            expect(userService.findUser(data)).not.toBeDefined();
        });
    });

    describe('getToken', () => {
        it('should be token', () => {
            const userService = app.get<UserService>(UserService);
            const data = {
                email: 'admin@admin.ru',
                password: '12345678'
            };
            const badRes = {
                statusCode: 401,
                error: "Unauthorized"
            };
            expect(userService.getTokenUser(data)).not.toEqual(badRes);
        });
        it('should be return error', () => {
            const userService = app.get<UserService>(UserService);
            const data = {
                email: 'aaa@aaa.ru',
                password: '1111111'
            };
            const badRes = {
                statusCode: 401,
                error: "Unauthorized"
            };
            expect(userService.getTokenUser(data)).toEqual(badRes);
        });
    });
});