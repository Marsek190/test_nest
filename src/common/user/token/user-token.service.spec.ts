import { Test, TestingModule } from '@nestjs/testing';
import { UserTokenService } from './user-token.service';
import { UserToken } from './user-token';

describe('UserTokenService', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            providers: [
                UserTokenService,
            ]
        }).compile();
    });

    describe('generateToken', () => {
        it('should be definded token', () => {
            const userTokenService = app.get<UserTokenService>(UserTokenService);
            expect(userTokenService.generateToken()).toBeInstanceOf(UserToken);
            expect(userTokenService.generateToken()).toBeDefined();
            expect(userTokenService.generateToken()).not.toBeNull();
        });
    });
});