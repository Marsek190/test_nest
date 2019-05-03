import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserModule } from '../../common/user/user.module';
import { UserService } from '../../common/user/user.service';
import { UserTokenService } from '../../common/user/token/user-token.service';

@Module({
    controllers: [
        UserController,
    ],
    imports: [
        UserModule,
    ],
    providers: [
        UserService,
        UserTokenService
    ]
})
export class V1Module { }
