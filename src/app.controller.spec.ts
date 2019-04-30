import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './common/user/user.service';
import { UserTokenService } from './common/user/token/user-token.service';
import { Request } from 'express';

describe('AppController', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [AppController],
            providers: [AppService, UserService, UserTokenService],
        }).compile();
    });

    describe('getHello', () => {
        it('should return "Hello World!"', () => {
            const appController = app.get<AppController>(AppController);
            expect(appController.getHello()).toBe('Hello World!');
        });
    });
    describe('getToken', () => {
        it('should return token', () => {
            const appController = app.get<AppController>(AppController);
            const request = {
                query: {
                    email: 'test@testing.ru',
                    password: '07654321'
                }
            } as Request;
            expect(appController.getToken(request)).toBeDefined();
            expect(appController.getToken(request)).not.toBeNull();
            expect(appController.getToken(request)).toContain('token');
        });
        it('should return error', () => {
            const appController = app.get<AppController>(AppController);
            const request = {
                query: {
                    email: 'blah-blah-blah',
                    password: 'tu-tu-tu'
                }
            } as Request;
            expect(appController.getToken(request)).toBeDefined();
            expect(appController.getToken(request)).not.toBeNull();
            expect(appController.getToken(request)).toEqual(JSON.stringify({
                statusCode: 401,
                error: "Unauthorized"
            }));
        });
    });
});