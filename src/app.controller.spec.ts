import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './common/user/user.service';
import { UserTokenService } from './common/user/token/user-token.service';

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
});