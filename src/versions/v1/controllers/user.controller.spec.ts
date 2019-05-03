import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../../common/user/user.service';
import { Request } from 'express';
import { UserTokenService } from '../../../common/user/token/user-token.service';

describe('UserController', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [UserController],
            providers: [UserService, UserTokenService],
        }).compile();
    });

    describe('login', () => {
        it('should return token', () => {
            const userController = app.get<UserController>(UserController);
            const request = {
                body: {
                    email: 'test@testing.ru',
                    password: '07654321'
                }
            } as Request;
            expect(userController.login(request)).toBeDefined();
            expect(userController.login(request)).not.toBeNull();
            expect(userController.login(request)).toContain('token');
        });
        it('should return error', () => {
            const userController = app.get<UserController>(UserController);
            const request = {
                body: {
                    email: 'blah-blah-blah',
                    password: 'tu-tu-tu'
                }
            } as Request;
            expect(userController.login(request)).toBeDefined();
            expect(userController.login(request)).not.toBeNull();
            expect(userController.login(request)).toEqual(JSON.stringify({
                statusCode: 401,
                error: "Unauthorized"
            }));
        });
    });
});